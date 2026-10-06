const $=id=>document.getElementById(id);
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function tab(t){["T","Q"].forEach(x=>{$(x).classList.toggle("hide",x!=t);$("b"+x).classList.toggle("off",x!=t)})}
$("T").innerHTML=TEMAS.map((t,i)=>`<div class="card"><h3>${i+1}. ${t}</h3>${TEORIA[i]}</div>`).join("");
let L,n,A,C,OO;
function setup(){
 $("game").innerHTML="";
 $("setup").innerHTML=`<b>Elegí los temas:</b>
 <label><input type="checkbox" checked onchange="document.querySelectorAll('.tm').forEach(c=>c.checked=this.checked)"> <b>Todos</b></label>`
 +TEMAS.map((t,i)=>`<label><input type="checkbox" class="tm" value="${i}" checked> ${t} (${P.filter(p=>p[0]==i).length})</label>`).join("")
 +`<label><input type="checkbox" id="mix" checked> 🔀 Mezclar preguntas</label><button class="btn" onclick="start()">Empezar</button>`;
 $("setup").classList.remove("hide")}
function start(){
 const ts=[...document.querySelectorAll(".tm:checked")].map(c=>+c.value);
 L=P.filter(p=>ts.includes(p[0]));
 if(!L.length)return alert("Elegí al menos un tema");
 if($("mix").checked)L=shuf(L);
 n=0;A=[];C=[];OO=[];$("setup").classList.add("hide");render()}
function pick(i){if(C[n])return;A[n]=OO[n][i];render()}
function confirmar(){C[n]=true;render()}
function go(d){n+=d;render();window.scrollTo(0,0)}
function render(){
 if(n>=L.length){
  const ok=L.filter((q,i)=>A[i]==q[2]).length;
  $("game").innerHTML=`<div class="card"><h3>🎉 Terminaste</h3>Puntaje: <b>${ok}/${L.length}</b> (${Math.round(ok*100/L.length)}%)<br>Sin responder: ${L.filter((q,i)=>!C[i]).length}<br><button class="btn" onclick="go(-1)">⬅ Regresar</button><button class="btn" onclick="setup()">Volver a empezar</button></div>`;return}
 const q=L[n];if(!OO[n])OO[n]=shuf(q.slice(2,6));
 const m=q[1].match(/Incidente (\d)/),inc=m&&INC[m[1]-1],done=C[n];
 let h=`<div class="card"><small>Pregunta ${n+1}/${L.length} · ${TEMAS[q[0]]}</small><h3>${q[1]}</h3>`;
 if(inc)h+=`<div class="inc"><b>📌 Incidente ${m[1]} – Escenario:</b> ${inc[0]}</div>`;
 h+=OO[n].map((x,i)=>{let c="opt";if(done){if(x==q[2])c+=" ok";else if(x==A[n])c+=" bad"}else if(x==A[n])c+=" sel";return `<button class="${c}" onclick="pick(${i})">${x}</button>`}).join("");
 if(done){
  h+=`<div class="exp"><b>${A[n]==q[2]?"✅ ¡Correcto!":"❌ Elegiste otra opción."}</b><br><b>Respuesta correcta:</b> ${q[2]}<br><br>💡 ${q[6]}</div>`;
  if(inc)h+=`<div class="inc"><b>🔎 Diagnóstico y solución del Incidente ${m[1]}:</b> ${inc[1]}</div>`;
  h+=`<details open class="exp"><summary><b>📖 Repaso: ${TEMAS[q[0]]}</b></summary>${TEORIA[q[0]]}</details>`}
 h+=`<div class="nav2"><button class="btn" onclick="go(-1)" ${n?"":"disabled"}>⬅ Regresar</button><button class="btn" onclick="confirmar()" ${(!done&&A[n])?"":"disabled"}>✔ Confirmar</button><button class="btn" onclick="go(1)">${n==L.length-1?"Ver resultado":"Siguiente ➜"}</button></div></div>`;
 $("game").innerHTML=h}
tab("T");setup();
