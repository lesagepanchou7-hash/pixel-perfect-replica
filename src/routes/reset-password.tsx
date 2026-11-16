import {createFileRoute} from '@tanstack/react-router';
import {useEffect,useState,type FormEvent} from 'react';
import {supabase} from '@/integrations/supabase/client';
import {Button} from '@/components/ui/button';
import {pageHead} from '@/lib/engineering-content';
export const Route=createFileRoute('/reset-password')({head:()=>pageHead('Reset your password','Set a new EngineeringOS password from your recovery link.'),component:ResetPassword});
function ResetPassword(){const [valid,setValid]=useState(false),[password,setPassword]=useState(''),[message,setMessage]=useState('');useEffect(()=>{const recovery=window.location.hash.includes('type=recovery');setValid(recovery);},[]);async function submit(e:FormEvent){e.preventDefault();const {error}=await supabase.auth.updateUser({password});setMessage(error?.message||'Password updated.');}return <main className="onboarding-main"><h1>Reset your password</h1>{valid?<form onSubmit={submit} className="account-form"><label>New password<input type="password" minLength={8} required value={password} onChange={e=>setPassword(e.target.value)}/></label><Button>Update password</Button></form>:<p>Open the recovery link from your email to set a new password.</p>}<p role="status">{message}</p></main>;}
