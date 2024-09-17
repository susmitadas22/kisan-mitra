from transformers import pipeline


pipe = pipeline("image-classification", model="gianlab/swin-tiny-patch4-window7-224-finetuned-plantdisease")

# image_path = "./sample/tomato_mosaic_virus.png"
image_path = "./sample/potato_late_blight.png"

result = pipe(image_path)

print(result)