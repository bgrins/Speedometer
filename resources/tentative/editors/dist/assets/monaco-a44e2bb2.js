import{a as u,c as g}from"./bigtext-d8fe58e7.js";require.config({paths:{vs:EDITOR_PATH}});self.MonacoEnvironment={getWorker:()=>c};const c=new Worker(URL.createObjectURL(new Blob([`
    self.MonacoEnvironment = { baseUrl: ${JSON.stringify(new URL(location.pathname.includes("/dist/")?"../monaco-editor-built/min":"./monaco-editor-built/min",window.location))} };
    importScripts(self.MonacoEnvironment.baseUrl + '/vs/base/worker/workerMain.js');
    postMessage({ type: 'ready' });`],{type:"text/javascript"})));let d=new Promise(t=>{c.addEventListener("message",i=>{i.data.type==="ready"&&t()})});const h=new Promise(t=>{require(["vs/editor/editor.main"],function(){t(self.monaco)})});async function m(t,i){let{editor:a,languages:b}=await h,o=a.create(t,{value:i,automaticLayout:!0,wordWrap:"wordWrapColumn",wordWrapColumn:80});return{editor:o,ready:d,getScrollHeight(){return o.getScrollHeight()},getScrollTop(){return o.getScrollTop()},setScrollTop(r){o.setScrollTop(r),o.render(!0)},setValue(r){o.setValue(r),o.render(!0)},format(r){a.setModelLanguage(o.getModel(),r?"javascript":"plaintext"),o.render(!0)}}}let v=document.querySelector("#editor"),l=null,n=null,e={create:document.querySelector("#create"),highlight:document.querySelector("#highlight"),unhighlight:document.querySelector("#unhighlight"),big:document.querySelector("#big"),small:document.querySelector("#small"),scroll:document.querySelector("#scroll"),layout:document.querySelector("#layout")};e.scroll.addEventListener("click",S);e.highlight.addEventListener("click",f);e.unhighlight.addEventListener("click",y);e.big.addEventListener("click",p);e.small.addEventListener("click",L);e.layout.addEventListener("click",s);e.create.addEventListener("click",t=>{n||(n=m(v),n.then(i=>{l=i,l.ready.then(()=>{e.unhighlight.classList.add("active","true"),e.create.setAttribute("disabled","true")})}))});function s(){const t=document.body.getBoundingClientRect();s.e=document.elementFromPoint(t.width/2|0,t.height/2|0)}function f(){e.unhighlight.classList.toggle("active",!1),e.highlight.classList.toggle("active",!0),l.format(!0)}function y(){e.unhighlight.classList.toggle("active",!0),e.highlight.classList.toggle("active",!1),l.format(!1)}function p(){e.small.classList.toggle("active",!1),e.big.classList.toggle("active",!0),l.setValue(u)}function L(){e.small.classList.toggle("active",!0),e.big.classList.toggle("active",!1),l.setValue(g)}function S(){let t=l.getScrollTop()==0;l.setScrollTop(t?l.getScrollHeight():0)}
