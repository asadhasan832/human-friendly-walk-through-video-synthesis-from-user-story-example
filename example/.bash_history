ls
cd ~
ls
apt update
ls
ffmpeg -i generated-walkthrough.webm -c:v libx264 -profile:v main -level 3.1 -crf 23 -c:a aac -movflags +faststart generated-walkthrough.mp4
apt install ffmpeg
ls
ffmpeg -i generated-walkthrough.webm -c:v libx264 -profile:v main -level 3.1 -crf 23 -c:a aac -movflags +faststart generated-walkthrough.mp4
