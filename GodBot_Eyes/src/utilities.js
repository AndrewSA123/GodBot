import { math } from "@tensorflow/tfjs";

export const drawRect = (detections, ctx) => {
    detections.forEach(predictions => {
        const [x,y,width,height] = predictions['bbox'];
        const text = predictions['class'];

        // const color = '#' + Math.floor(Math.random()*16777215).toString(16);
        const color = 'blue';
        ctx.strokeStyle = color;
        ctx.font = '18px Arial';
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.fillText(text, x, y);
        ctx.rect(x,y,width,height);
        ctx.stroke();

    });
}
