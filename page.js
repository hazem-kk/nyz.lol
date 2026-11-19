'use client'
import { supabase } from '../../lib/supabase'
export default function Login(){
  const go=p=>supabase.auth.signInWithOAuth({provider:p,options:{redirectTo:location.origin+'/dashboard'}})
  return(<div className="box"><h1>Welcome to nyz.lol</h1><p style={{color:'var(--mute)'}}>Sign in to claim your link.</p>
    <button className="btn wide" onClick={()=>go('discord')}>Continue with Discord</button>
    <button className="btn ghost wide" onClick={()=>go('google')}>Continue with Google</button></div>)
}
