import * as React from 'react';
import './HSLColorChooser.scss';


interface OrdPair {
  x: number | null;
  y: number | null;
}

const scale = (val:number, orgScaleMin:number, orgScaleMax:number,
  newScaleMin:number, newScaleMax:number) => {
  return (
      ((val - orgScaleMin) * (newScaleMax - newScaleMin) /
      (orgScaleMax - orgScaleMin) + newScaleMin)
  );
}

const ordToAngle = (x:number, y:number) => {
  let a:number = Math.round(Math.atan2(y, x) * (180/Math.PI));
  if (a < 0) { a+=360 };
  return a;
}

const hypotenuse = (x:number, y:number) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

const HSLColorChooser = () => {
  const [lastClick, setLastClick] = 
    React.useState<OrdPair>({x:null,y:null});
  const [hue, setHue] = React.useState<number|null>(null);
  const [saturation, setSaturation] = React.useState<number|null>(null);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const getCursorPosition = (
    event: React.MouseEvent<HTMLCanvasElement>
  ) => {
    if (canvasRef.current) {

      let rect = canvasRef.current.getBoundingClientRect();
      // console.log(canvasRef.current.width);
      // console.log(rect.width);
      //console.dir(event);
      let length = rect.width;
      let x = event.clientX - rect.left;//round
      let y = event.clientY - rect.top;//these??
      //console.log(rect);
      x = x / length;
      y = y / length;
      x = scale(x, 0, 1, -1, 1);
      y = scale(y, 0, 1, 1, -1); //reverse y value
      setLastClick({x:Number(x.toFixed(2)), y:Number(y.toFixed(2))});
      setHue(ordToAngle(x,y));
      //increase scale to make selecting 100/0 saturation easier
      let newSat = scale(hypotenuse(x,y), 0, 1, -5, 105);
      if (newSat > 100) { newSat = 100 };
      if (newSat < 0) { newSat = 0 };
      setSaturation(Math.round(newSat));
    }
  };
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d")

    if (canvas && context) {
      const gradStopCount:number = 24;
      let radius:number = Math.round(canvas.width / 2);
      //gradientHue
      const gradientHue = context.createConicGradient(
        0, radius, radius
      );
      let i:number = gradStopCount;
      while (i >= 0) {
        gradientHue.addColorStop(
          1- (1/gradStopCount * i),
          "hsl(" + (360/gradStopCount * i) + ", 100%, 50%)"
        );
        i--; 
      }
      //gradientSaturation
      const gradientSaturation = context.createRadialGradient(
        radius, radius, 1,
        radius, radius, radius 
      );
      gradientSaturation.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradientSaturation.addColorStop(1, 'rgba(255, 255, 255, 0)');

      //clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      //draw circle path
      context.beginPath();
      context.arc(radius, radius, radius, 0, 2 * Math.PI);
      context.strokeStyle = gradientHue;
      context.stroke();
      context.fillStyle = gradientHue;
      context.fill();
      context.fillStyle = gradientSaturation;
      context.fill();
    }
  }, []);

  return (
    <div className='HSLColorChooser'>
      <canvas 
        id="HSLColorChooserCanvas"
        ref={canvasRef}
        width="400" height="400"
        onMouseDown={(e)=> getCursorPosition(e)}
      />
      <p>last x:{lastClick.x} y:{lastClick.y}</p>
      <label>Hue:{hue}</label>
      <input type="range" min="0" max="360" step="1" />
      <p>Saturation:{saturation}</p>
      <div 
        style={{
          height:"100px",
          width:"100px",
          background:"hsl("
            + hue
            + ", "
            + saturation
            + "%, 50%)"
        }}
      >
      </div>
    </div>
  );
}

export default HSLColorChooser;
