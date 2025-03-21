from pathlib import Path
import sys

# Get the absolute path of the current file
file_path = Path(__file__).resolve()

# Get the parent directory of the current file
root_path = file_path.parent

# Add the root path to the sys.path list if it is not already there
if root_path not in sys.path:
    sys.path.append(str(root_path))

# Get the relative path of the root directory with respect to the current working directory
ROOT = root_path.relative_to(Path.cwd())

# Sources
IMAGE = 'Image'
WEBCAM = 'WebCam'
YOUTUBE = 'YouTube'

SOURCES_LIST = [IMAGE,WEBCAM,YOUTUBE]

# Images config
IMAGES_DIR = ROOT / 'images'
DEFAULT_IMAGE = IMAGES_DIR / 'office_4.jpg'
DEFAULT_DETECT_IMAGE = IMAGES_DIR / 'office_4_detected.jpg'

# ML Model config
MODEL_DIR = ROOT / 'weights'
DETECTION_MODEL = MODEL_DIR / 'yolov8l.pt'
# In case of your custome model comment out the line above and
# Place your custom model pt file name at the line below
DETECTION_MODEL1 = MODEL_DIR / 'ppe.pt'

#ppe = MODEL_DIR / 'ppe.pt'

# Webcam
WEBCAM_PATH = 0
