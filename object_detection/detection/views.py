import base64
import cv2
import numpy as np
from ultralytics import YOLO
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response


# 🔹 Load YOLOv8 model (use yolov8x for accuracy, yolov8n for speed)
model = YOLO("yolov8n.pt")  # or "yolov8l.pt" if GPU is slow


@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
def detect_objects(request):
    """
    Object detection API using YOLOv8x
    Accepts an uploaded image and returns:
    - Annotated image (base64)
    - Detected objects (labels, confidence, bounding boxes)
    """
    try:
        # ✅ Check for image in request
        if "image" not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        file = request.FILES["image"]

        # ✅ Read image into OpenCV
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        # ✅ Run YOLOv8 detection with confidence threshold
        results = model(image, conf=0.35)

        detections = []
        annotated_image = results[0].plot()  # YOLO draws boxes automatically

        for box in results[0].boxes:
            cls_id = int(box.cls[0])
            label = model.names[cls_id]
            conf = float(box.conf[0])
            xyxy = box.xyxy[0].tolist()  # [x1, y1, x2, y2]

            detections.append({
                "label": label,
                "confidence": round(conf, 3),
                "box": [round(x, 2) for x in xyxy]
            })

        # ✅ Encode annotated image to base64
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
        return Response({"error": str(e)}, status=500)
