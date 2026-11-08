/* Exact free Gaussian; dimensionless hbar=m=1, x0=0. Works offline. */
(function(root){
'use strict';
function stats(s,k,t){const tau=t/(2*s*s);return {meanX:k*t,meanP:k,sigmaX:s*Math.sqrt(1+tau*tau),sigmaP:1/(2*s),product:Math.sqrt(1+tau*tau)/2};}
function state(x,s,k,t){const tau=t/(2*s*s),d=x-k*t,den=1+tau*tau;
const amp=Math.pow(2*Math.PI*s*s,-.25)*Math.pow(den,-.25)*Math.exp(-d*d/(4*s*s*den));
const phase=-Math.atan(tau)/2+d*d*tau/(4*s*s*den)+k*x-k*k*t/2;
return {re:amp*Math.cos(phase),im:amp*Math.sin(phase),rho:amp*amp};}
function momentumDensity(p,s,k){const sp=1/(2*s);return Math.exp(-.5*((p-k)/sp)**2)/(Math.sqrt(2*Math.PI)*sp);}
function sample(s,rng=Math.random){return s*Math.sqrt(-2*Math.log(Math.max(Number.MIN_VALUE,rng())))*Math.cos(2*Math.PI*rng());}
const api={stats,state,momentumDensity,sample};root.QM=api;if(typeof module!=='undefined')module.exports=api;
})(typeof globalThis!=='undefined'?globalThis:this);
