import{a as v,S as q,i as c}from"./assets/vendor-B5nsgUv9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const B="https://pixabay.com/api/",$="54632285-9bf1eb309cadbee9430723f7a";async function u(s,r=1){return(await v.get(B,{params:{key:$,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more"),M=new q(".gallery a",{captionsData:"alt",captionDelay:250});function p(s){const r=s.map(({webformatURL:o,largeImageURL:i,tags:e,likes:t,views:a,comments:w,downloads:S})=>`
      <li class="gallery-item">
        <a href="${i}">
          <img src="${o}" alt="${e}" />
        </a>
        <div class="info">
          <p><b>Likes</b> ${t}</p>
          <p><b>Views</b> ${a}</p>
          <p><b>Comments</b> ${w}</p>
          <p><b>Downloads</b> ${S}</p>
        </div>
      </li>
    `).join("");f.insertAdjacentHTML("beforeend",r),M.refresh()}function O(){f.innerHTML=""}function h(){m.classList.remove("is-hidden")}function g(){m.classList.add("is-hidden")}function L(){y.classList.remove("is-hidden")}function l(){y.classList.add("is-hidden")}const P=document.querySelector(".form"),E=document.querySelector(".load-more");let n=1,b="",d=0;P.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.elements.searchQuery.value.trim();if(r){n=1,b=r,O(),l(),h();try{const o=await u(r,n);if(o.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}d=o.totalHits,p(o.hits),d>15&&L()}catch{c.error({message:"Something went wrong!"})}finally{g()}}});E.addEventListener("click",async()=>{n+=1,h(),l();try{const s=await u(b,n);p(s.hits),n*15>=d?(l(),c.info({message:"We're sorry, but you've reached the end of search results."})):L();const{height:o}=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}catch{c.error({message:"Something went wrong!"})}finally{g()}});
//# sourceMappingURL=index.js.map
