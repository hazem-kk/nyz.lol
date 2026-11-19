'use client'
import { useEffect, useRef, useState } from 'react'
const T={crimson:['#8E1230','#E0364F'],gold:['#9C7020','#E6C27A'],steel:['#4A5766','#B4C2D1'],emerald:['#0B5B43','#3FBF8F']}
const safe=u=>/^https?:\/\//i.test(u)?u:'#'
export default function ProfileCard({p}){
  const [on,setOn]=useState(false),[d,setD]=useState(null),a=useRef(null),[c1,c2]=T[p.theme]||T.crimson
  useEffect(()=>{
    if(!p.discord_id)return
    const f=()=>fetch('https://api.lanyard.rest/v1/users/'+encodeURIComponent(p.discord_id)).then(r=>r.json()).then(j=>j.success&&setD(j.data)).catch(()=>{})
    f();const t=setInterval(f,30000);return()=>clearInterval(t)
  },[p.discord_id])
  const game=d&&d.activities&&d.activities.find(x=>x.type===0)
  const col={online:'#3DDC84',idle:'#F5B942',dnd:'#E0364F',offline:'#6b6b6b'}[(d&&d.discord_status)||'offline']
  return(<div className="pstage" style={{'--c1':c1,'--c2':c2}}>
    {!on&&<div className="enter" onClick={()=>{setOn(true);a.current&&a.current.play().catch(()=>{})}}>click to enter</div>}
    {p.music_url&&<audio ref={a} src={safe(p.music_url)} loop/>}
    <div className="pcard">
      {p.avatar_url?<img className="av" src={p.avatar_url} alt=""/>:<div className="av">{p.username[0]}</div>}
      <h1 style={{fontSize:'1.8rem'}}>{p.display_name||p.username}</h1><p style={{opacity:.9}}>{p.bio}</p>
      {d&&<div className="disc"><i style={{background:col}}/><div>{game?'Playing '+game.name:d.discord_status}</div></div>}
      {(p.links||[]).map((l,i)=><a className="lk" key={i} href={safe(l.url)} target="_blank" rel="noopener noreferrer"><span>{l.label}</span><span>↗</span></a>)}
      <div className="views">👁 {p.views.toLocaleString('en-US')} views</div>
    </div></div>)
}
