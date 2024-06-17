import{u as S,Q}from"./myPythonStore.8fb5b514.js";import{Q as k,a as q}from"./QBtnDropdown.db9fa631.js";import{Q as C,n as I,o as T}from"./focus-manager.ef2a25d1.js";import{Q as _}from"./QCardSection.586a20dc.js";import{Q as u}from"./QCard.8180e6c1.js";import{_ as g}from"./plugin-vue_export-helper.9688b2fe.js";import{r as f,w as V,a as n,R as v,Z as D,V as t,U as r,S as O,a7 as L,$ as N,aa as B,W as o,_ as m,a6 as w,ab as F,ac as W,ad as y,Y as P}from"./index.700a1036.js";import{u as E}from"./formDataStore.896e6ae0.js";import"./render.9433c8d6.js";import"./axios.37d53be1.js";import"./QBtn.c59cb0af.js";const j={props:{Reward_Data:Object},setup(a){const s=f(""),d=f(!1),e=f([]);V(()=>a.Reward_Data,()=>{a.Reward_Data&&a.Reward_Data["Total wallet mining rewards"]?(e.value=Object.keys(a.Reward_Data["Total wallet mining rewards"]||{}),s.value=e.value[e.value.length-1]||""):console.error("Reward_Data is not properly initialized or missing required properties.")},{immediate:!0});const c=h=>{s.value=h,d.value=!1},l=h=>new Date(h).toLocaleDateString(void 0,{year:"numeric",month:"long",day:"numeric"}),p=n(()=>a.Reward_Data&&a.Reward_Data["Total wallet mining rewards"][s.value]||0),R=n(()=>a.Reward_Data&&a.Reward_Data["Total wallet royalties"][s.value]||0),x=n(()=>a.Reward_Data&&a.Reward_Data["Total wallet ecosystem fees"][s.value]||0),b=n(()=>a.Reward_Data&&a.Reward_Data["Total wallet derp rewards"]||0);return{currentDate:s,dropdownOpen:d,availableDates:e,onItemClick:c,rewardDate:l,miningRewards:p,royalties:R,ecosystemFees:x,derpRewards:b}}},A=a=>(F("data-v-e0e58e86"),a=a(),W(),a),M=A(()=>o("div",{class:"text-h4"},null,-1)),U={class:"q-card-elements"},$={class:"text-h5 q-mt-sm q-mb-xs"},z={class:"text"},Y={class:"text-h5 q-mt-sm q-mb-xs"},Z={class:"text"},G={class:"text-h5 q-mt-sm q-mb-xs"},H={class:"text"},J={class:"text-h5 q-mt-sm q-mb-xs"},K={class:"text"};function X(a,s,d,e,i,c){return v(),D(u,{class:"my-rewards",flat:""},{default:t(()=>[r(_,null,{default:t(()=>[M,d.Reward_Data?(v(),D(k,{key:0,label:e.currentDate?e.rewardDate(e.currentDate):"Select Date",color:"primary",modelValue:e.dropdownOpen,"onUpdate:modelValue":s[0]||(s[0]=l=>e.dropdownOpen=l)},{default:t(()=>[r(C,null,{default:t(()=>[(v(!0),O(N,null,L(e.availableDates,(l,p)=>(v(),D(I,{key:p,clickable:"",onClick:R=>e.onItemClick(l)},{default:t(()=>[r(T,null,{default:t(()=>[r(q,null,{default:t(()=>[m(w(e.rewardDate(l)),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1},8,["label","modelValue"])):B("",!0),o("div",U,[r(u,{class:"subcard"},{default:t(()=>[r(_,null,{default:t(()=>[o("div",$,[m("Mining: "),o("div",z,w(e.miningRewards)+" ada ",1)])]),_:1})]),_:1}),r(u,{class:"subcard"},{default:t(()=>[r(_,null,{default:t(()=>[o("div",Y,[m("Royalties: "),o("div",Z,w(e.royalties)+" ada ",1)])]),_:1})]),_:1}),r(u,{class:"subcard"},{default:t(()=>[r(_,null,{default:t(()=>[o("div",G,[m("Ecosystem fees: "),o("div",H,w(e.ecosystemFees)+" ada ",1)])]),_:1})]),_:1}),r(u,{class:"subcard"},{default:t(()=>[r(_,null,{default:t(()=>[o("div",J,[m("$Derp: "),o("div",K,w(e.derpRewards)+" / epoch ",1)])]),_:1})]),_:1})])]),_:1})]),_:1})}var ee=g(j,[["render",X],["__scopeId","data-v-e0e58e86"]]);const ae={components:{CompWalletRewards:ee},setup(){const a=S(),s=E(),d=n(()=>s.getAddress),e=f([]),i=n(()=>e.value[2]),c=n(()=>e.value[3]),l=n(()=>e.value.slice(4));return y(()=>{d.value&&(console.log("Address changed:",d.value),a.fetchPost())}),y(()=>{e.value=a.pythonResponse,console.log("posts updated:",e.value),console.log("Reward_Data in parent:",i.value),console.log("Overview_Data in parent:",c.value),console.log("NFT_List in parent:",l.value)}),{formDataStore:s,address:d,posts:e,Reward_Data:i,Overview_Data:c,NFT_List:l}}},te=o("div",{class:"page-rewards-header text-h4"},"My Rewards",-1),se=o("div",{class:"page-rewards-subheader caption"},"See your estimated rewards for this period",-1),re={class:"q-pa-md container"};function oe(a,s,d,e,i,c){const l=P("comp-wallet-rewards");return v(),D(Q,null,{default:t(()=>[te,se,o("div",re,[r(l,{Reward_Data:e.Reward_Data},null,8,["Reward_Data"])])]),_:1})}var De=g(ae,[["render",oe]]);export{De as default};
