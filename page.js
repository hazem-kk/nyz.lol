import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ProfileCard from '../../components/ProfileCard'
export const dynamic='force-dynamic'
export default async function Page({params}){
  const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const u=params.username.toLowerCase()
  const {data}=await sb.from('profiles').select('username,display_name,bio,avatar_url,theme,music_url,discord_id,links,views').eq('username',u).maybeSingle()
  if(!data)notFound()
  await sb.rpc('increment_views',{u})
  return <ProfileCard p={{...data,views:data.views+1}}/>
}
