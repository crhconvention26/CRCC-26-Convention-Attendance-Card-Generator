(() => {
"use strict";
const W=1080,H=1350;
const canvas=document.getElementById("card"),ctx=canvas.getContext("2d");
const input=document.getElementById("photoInput");
const downloadBtn=document.getElementById("downloadBtn"),shareBtn=document.getElementById("shareBtn");
const changeBtn=document.getElementById("changeBtn"),resetBtn=document.getElementById("resetBtn");
const uploadTitle=document.getElementById("uploadTitle"),uploadSub=document.getElementById("uploadSub");
const flyer=new Image(); flyer.src="official-crcc-convention-flyer.jpg";
let portrait=null, objectUrl=null;
function roundedRect(c,x,y,w,h,r){c.beginPath();c.roundRect(x,y,w,h,r);}
function drawPlaceholder(){
  // Subtle gold portrait frame in the original flyer’s open upper-left cloud area.
  ctx.save();
  ctx.shadowColor="#000";ctx.shadowBlur=24;ctx.shadowOffsetY=8;
  ctx.fillStyle="rgba(12,9,7,.82)";ctx.beginPath();ctx.arc(145,202,100,0,Math.PI*2);ctx.fill();
  ctx.restore();
  const g=ctx.createLinearGradient(55,110,235,295);g.addColorStop(0,"#f7df9f");g.addColorStop(.5,"#b87c2d");g.addColorStop(1,"#f7df9f");
  ctx.strokeStyle=g;ctx.lineWidth=9;ctx.beginPath();ctx.arc(145,202,94,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle="#fff2d7";ctx.textAlign="center";ctx.font="bold 19px Arial";ctx.fillText("YOUR PHOTO",145,195);
  ctx.font="15px Arial";ctx.fillStyle="#e9c989";ctx.fillText("GOES HERE",145,220);
}
function drawPortrait(){
  if(!portrait)return drawPlaceholder();
  const cx=145,cy=202,r=91;
  ctx.save();
  ctx.shadowColor="rgba(0,0,0,.8)";ctx.shadowBlur=28;ctx.shadowOffsetY=9;
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fillStyle="#120d08";ctx.fill();
  ctx.restore();
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
  const iw=portrait.naturalWidth||portrait.width,ih=portrait.naturalHeight||portrait.height;
  // Center crop to a square without stretching; keep the uploaded image untouched.
  const side=Math.min(iw,ih),sx=(iw-side)/2,sy=(ih-side)/2;
  ctx.drawImage(portrait,sx,sy,side,side,cx-r,cy-r,2*r,2*r);
  ctx.restore();
  const gold=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);gold.addColorStop(0,"#fff0b9");gold.addColorStop(.45,"#b77a27");gold.addColorStop(1,"#ffe7a1");
  ctx.strokeStyle=gold;ctx.lineWidth=10;ctx.beginPath();ctx.arc(cx,cy,r+2,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle="rgba(255,255,255,.7)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r-7,0,Math.PI*2);ctx.stroke();
}
function drawCard(){
  ctx.clearRect(0,0,W,H);
  if(flyer.complete&&flyer.naturalWidth){
    // Cover crop to a 4:5 canvas. All key artwork remains in view at near-native scale.
    const scale=Math.max(W/flyer.width,H/flyer.height),dw=flyer.width*scale,dh=flyer.height*scale;
    ctx.drawImage(flyer,(W-dw)/2,(H-dh)/2,dw,dh);
  }else{
    const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,"#3d2814");bg.addColorStop(.55,"#100d0a");bg.addColorStop(1,"#030303");ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  }
  // A restrained dark vignette gives the uploaded portrait a clean, premium edge.
  const v=ctx.createRadialGradient(160,210,40,160,210,210);v.addColorStop(0,"rgba(0,0,0,0)");v.addColorStop(1,"rgba(0,0,0,.35)");ctx.fillStyle=v;ctx.fillRect(0,0,390,430);
  drawPortrait();
  // Attendance announcement in a compact premium plaque along the upper-left cloud.
  ctx.save();
  const x=35,y=350,w=300,h=91;
  ctx.shadowColor="#000";ctx.shadowBlur=18;ctx.shadowOffsetY=5;
  const grad=ctx.createLinearGradient(x,y,x+w,y+h);grad.addColorStop(0,"rgba(20,13,7,.96)");grad.addColorStop(1,"rgba(62,34,12,.96)");
  roundedRect(ctx,x,y,w,h,13);ctx.fillStyle=grad;ctx.fill();
  ctx.shadowBlur=0;ctx.strokeStyle="#e4b85d";ctx.lineWidth=3;ctx.stroke();
  ctx.textAlign="center";ctx.fillStyle="#f5d58e";ctx.font="900 27px Arial";ctx.fillText("I WILL BE",x+w/2,y+37);
  ctx.fillStyle="#fff";ctx.font="900 29px Arial";ctx.fillText("ATTENDING!",x+w/2,y+70);
  ctx.restore();
  // Fine footer tag; no participant name or name field is ever rendered.
  ctx.save();ctx.textAlign="center";ctx.font="italic 700 17px Arial";ctx.fillStyle="#ffe4a4";
  ctx.shadowColor="#000";ctx.shadowBlur=5;ctx.fillText("WILL YOU BE THERE?",W/2,1322);ctx.restore();
}
function setReady(ready){
  downloadBtn.disabled=!ready;shareBtn.disabled=!ready;changeBtn.disabled=!ready;resetBtn.disabled=!ready;
}
function loadFile(file){
  if(!file)return;
  if(!/^image\/(jpeg|png|webp)$/.test(file.type)){alert("Please choose a JPG, PNG or WEBP photograph.");return;}
  if(file.size>15*1024*1024){alert("Please choose an image smaller than 15 MB.");return;}
  if(objectUrl)URL.revokeObjectURL(objectUrl);
  objectUrl=URL.createObjectURL(file);
  const img=new Image();
  img.onload=()=>{portrait=img;drawCard();setReady(true);uploadTitle.textContent="Photo added successfully";uploadSub.textContent="Your card is ready. You can change the photo any time.";};
  img.onerror=()=>alert("That image could not be opened. Please try another photo.");
  img.src=objectUrl;
}
input.addEventListener("change",e=>loadFile(e.target.files[0]));
document.getElementById("uploadLabel").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();input.click();}});
changeBtn.addEventListener("click",()=>input.click());
resetBtn.addEventListener("click",()=>{
  portrait=null;input.value="";if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}
  uploadTitle.textContent="Tap to upload your photo";uploadSub.textContent="JPG, PNG or WEBP · Best with a clear face";setReady(false);drawCard();
});
function pngBlob(){return new Promise(resolve=>canvas.toBlob(resolve,"image/png"));}
downloadBtn.addEventListener("click",async()=>{
  const blob=await pngBlob();if(!blob){alert("Could not create the PNG. Please try again.");return;}
  const a=document.createElement("a"),url=URL.createObjectURL(blob);a.href=url;a.download="CRCC-Convention-26-Attendance-Card.png";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
});
shareBtn.addEventListener("click",async()=>{
  const blob=await pngBlob();if(!blob)return;
  const file=new File([blob],"CRCC-Convention-26-Attendance-Card.png",{type:"image/png"});
  if(navigator.canShare&&navigator.canShare({files:[file]})){
    try{await navigator.share({files:[file],title:"CRCC Convention '26",text:"I will be attending! Will you be there?"});}catch(e){if(e.name!=="AbortError")alert("Sharing was not available. Please download the card and share it manually.");}
  }else{
    try{await navigator.clipboard.writeText("I will be attending the CRCC Prophetic & Apostolic Healing Convention '26!");alert("Your card is ready to download. This browser does not support direct image sharing; download it and attach it in your social app.");}
    catch(e){alert("Please download your card and share it from your gallery.");}
  }
});
flyer.onload=drawCard;flyer.onerror=()=>{drawCard();alert("The official flyer image could not be loaded. Please ensure the flyer JPG remains beside index.html.");};
drawCard();
})();