(() => {
"use strict";
const W=1080,H=1350,canvas=document.getElementById("card"),ctx=canvas.getContext("2d");
const input=document.getElementById("photoInput");
const downloadBtn=document.getElementById("downloadBtn"),shareBtn=document.getElementById("shareBtn");
const changeBtn=document.getElementById("changeBtn"),resetBtn=document.getElementById("resetBtn");
const uploadTitle=document.getElementById("uploadTitle"),uploadSub=document.getElementById("uploadSub");
const flyer=new Image();flyer.src="official-crcc-convention-flyer.jpg";
let portrait=null,objectUrl=null;
function rr(x,y,w,h,r){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else ctx.rect(x,y,w,h);}
function drawFlyer(){
 if(!flyer.complete||!flyer.naturalWidth){
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,"#493019");bg.addColorStop(.6,"#100d0a");bg.addColorStop(1,"#030303");ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);return;
 }
 // Blurred edge fill prevents cropping while maintaining a full 4:5 export.
 const cover=Math.max(W/flyer.width,H/flyer.height),bw=flyer.width*cover,bh=flyer.height*cover;
 ctx.save();ctx.filter="blur(25px) brightness(.38)";ctx.drawImage(flyer,(W-bw)/2,(H-bh)/2,bw,bh);ctx.restore();
 // The complete official flyer is fitted inside the canvas: no ministers or event details are cut off.
 const s=Math.min(W/flyer.width,H/flyer.height),dw=flyer.width*s,dh=flyer.height*s,dx=(W-dw)/2,dy=(H-dh)/2;
 ctx.save();ctx.shadowColor="rgba(0,0,0,.65)";ctx.shadowBlur=24;ctx.drawImage(flyer,dx,dy,dw,dh);ctx.restore();
}
function drawPortrait(){
 const cx=125,cy=225,r=110;
 ctx.save();ctx.shadowColor="rgba(0,0,0,.9)";ctx.shadowBlur=30;ctx.shadowOffsetY=8;
 ctx.beginPath();ctx.arc(cx,cy,r+7,0,Math.PI*2);ctx.fillStyle="#120b06";ctx.fill();ctx.restore();
 if(portrait){
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.clip();
  const iw=portrait.naturalWidth||portrait.width,ih=portrait.naturalHeight||portrait.height,side=Math.min(iw,ih);
  ctx.drawImage(portrait,(iw-side)/2,(ih-side)/2,side,side,cx-r,cy-r,2*r,2*r);ctx.restore();
 }else{
  const g=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);g.addColorStop(0,"#49321b");g.addColorStop(.5,"#1a120b");g.addColorStop(1,"#76501f");
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();
  ctx.textAlign="center";ctx.fillStyle="#f7dca0";ctx.font="bold 24px Arial";ctx.fillText("YOUR PHOTO",cx,cy-5);
  ctx.font="bold 18px Arial";ctx.fillStyle="#fff";ctx.fillText("HERE",cx,cy+25);
 }
 const gold=ctx.createLinearGradient(cx-r,cy-r,cx+r,cy+r);gold.addColorStop(0,"#fff0b9");gold.addColorStop(.45,"#b77a27");gold.addColorStop(1,"#ffe7a1");
 ctx.strokeStyle=gold;ctx.lineWidth=11;ctx.beginPath();ctx.arc(cx,cy,r+2,0,Math.PI*2);ctx.stroke();
 ctx.strokeStyle="rgba(255,255,255,.85)";ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r-8,0,Math.PI*2);ctx.stroke();
}
function drawBadge(){
 // Occupies the open left cloud area; keeps title, RHEMA theme, event details and ministers clear.
 const x=14,y=385,w=250,h=76;ctx.save();ctx.shadowColor="#000";ctx.shadowBlur=22;ctx.shadowOffsetY=6;
 const g=ctx.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,"rgba(14,10,7,.97)");g.addColorStop(1,"rgba(56,31,12,.97)");
 rr(x,y,w,h,15);ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle="#e9bd64";ctx.lineWidth=3;ctx.stroke();
 ctx.textAlign="center";ctx.fillStyle="#ffe1a0";ctx.font="900 20px Arial";ctx.fillText("I WILL BE ATTENDING!",x+w/2,y+31);
 ctx.fillStyle="#fff";ctx.font="italic 700 16px Arial";ctx.fillText("WILL YOU BE THERE?",x+w/2,y+57);ctx.restore();
}
function drawCard(){ctx.clearRect(0,0,W,H);drawFlyer();drawPortrait();drawBadge();}
function ready(v){downloadBtn.disabled=!v;shareBtn.disabled=!v;changeBtn.disabled=!v;resetBtn.disabled=!v;}
function loadFile(file){
 if(!file)return;
 if(!/^image\/(jpeg|png|webp)$/.test(file.type)){alert("Please choose a JPG, PNG or WEBP photograph.");return;}
 if(file.size>15*1024*1024){alert("Please choose an image smaller than 15 MB.");return;}
 if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(file);
 const img=new Image();img.onload=()=>{portrait=img;drawCard();ready(true);uploadTitle.textContent="Photo added successfully";uploadSub.textContent="Your portrait is now prominent on the card. Change it any time.";};
 img.onerror=()=>alert("That image could not be opened. Please try another photo.");img.src=objectUrl;
}
input.addEventListener("change",e=>loadFile(e.target.files[0]));
document.getElementById("uploadLabel").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();input.click();}});
changeBtn.addEventListener("click",()=>input.click());
resetBtn.addEventListener("click",()=>{portrait=null;input.value="";if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}
 uploadTitle.textContent="Tap to upload your photo";uploadSub.textContent="JPG, PNG or WEBP · Best with a clear face";ready(false);drawCard();});
const png=()=>new Promise(resolve=>canvas.toBlob(resolve,"image/png"));
downloadBtn.addEventListener("click",async()=>{const blob=await png();if(!blob){alert("Could not create the PNG. Please try again.");return;}
 const a=document.createElement("a"),url=URL.createObjectURL(blob);a.href=url;a.download="CRCC-Convention-26-Attendance-Card.png";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);});
shareBtn.addEventListener("click",async()=>{const blob=await png();if(!blob)return;const file=new File([blob],"CRCC-Convention-26-Attendance-Card.png",{type:"image/png"});
 if(navigator.canShare&&navigator.canShare({files:[file]})){try{await navigator.share({files:[file],title:"CRCC Convention '26",text:"I will be attending! Will you be there?"});}
 catch(e){if(e.name!=="AbortError")alert("Direct sharing is unavailable. Download the card and share it from your gallery.");}}
 else alert("Direct image sharing is not supported here. Download the PNG and share it from your gallery.");});
flyer.onload=drawCard;flyer.onerror=()=>{drawCard();alert("The official flyer could not be loaded. Keep the flyer JPG beside index.html.");};drawCard();
})();
