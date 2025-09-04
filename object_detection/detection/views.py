import base64
import cv2
import numpy as np
from ultralytics import YOLO
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
import os

# 🔹 Ensure YOLO uses writable config directory
os.environ['YOLO_CONFIG_DIR'] = '/tmp/ultralytics'

# 🔹 Lazy-load YOLOv8 nano model (low memory usage)
model = None
def get_model():
    global model
    if model is None:
        model = YOLO("yolov8n.pt")
        model.to("cpu")  # Force CPU-only inference
    return model

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def detect_objects(request):
    """
    Object detection API using YOLOv8n.
    Accepts an uploaded image and returns:
    - Annotated image (base64)
    - Detected objects (labels, confidence, bounding boxes)
    """
    try:
        if "image" not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        file = request.FILES["image"]

        # Read image into OpenCV
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # 🔹 Resize to reduce memory usage
        image = cv2.resize(image, (320, 320))

        # 🔹 Run YOLOv8n detection with lower RAM usage
        results = get_model()(image, conf=0.25, imgsz=320)

        detections = []
        annotated_image = results[0].plot()  # YOLO draws boxes automatically

        for box in results[0].boxes:
            cls_id = int(box.cls[0])
            label = get_model().names[cls_id]
            conf = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()  # [x1, y1, x2, y2]

            detections.append({
                "label": label,
                "confidence": round(conf, 3),
                "box": [round(x, 2) for x in xyxy]
            })

        # Encode annotated image to base64
        _, buffer = cv2.imencode(".jpg", annotated_image)
        encoded_image = base64.b64encode(buffer).decode("utf-8")

        return Response({
            "image": encoded_image,
            "detections": {
                "headers": ["Label", "Confidence", "X1", "Y1", "X2", "Y2"],
                "rows": [
                    [
                        det["label"],
                        det["confidence"],
                        det["box"][0],
                        det["box"][1],
                        det["box"][2],
                        det["box"][3],
                    ]
                    for det in detections
                ]
            }
        })

    except Exception as e:
        return Response({"error": f"Detection failed: {str(e)}"}, status=500)
