/*! Three.js r180 with OrbitControls, PointerLockControls, EffectComposer, RenderPass, UnrealBloomPass, OutputPass. Copyright 2010-2025 Three.js Authors. SPDX-License-Identifier: MIT. Built for the Bridge Crew shelf by scripts/build-shelf.ts. */
(()=>{var sg=Object.defineProperty;var rg=(t)=>t;function ag(t,e){this[t]=rg.bind(null,e)}var og=(t,e)=>{for(var n in e)sg(t,n,{get:e[n],enumerable:!0,configurable:!0,set:ag.bind(e,n)})};var vd={};og(vd,{ACESFilmicToneMapping:()=>Ur,AddEquation:()=>Fi,AddOperation:()=>Lh,AdditiveAnimationBlendMode:()=>lp,AdditiveBlending:()=>Cs,AgXToneMapping:()=>Fr,AlphaFormat:()=>Gh,AlwaysCompare:()=>nu,AlwaysDepth:()=>Er,AlwaysStencilFunc:()=>Pp,AmbientLight:()=>$l,AnimationAction:()=>rc,AnimationClip:()=>Li,AnimationLoader:()=>Eu,AnimationMixer:()=>ku,AnimationObjectGroup:()=>zu,AnimationUtils:()=>bu,ArcCurve:()=>Cl,ArrayCamera:()=>nc,ArrowHelper:()=>od,AttachedBindMode:()=>Wf,Audio:()=>ic,AudioAnalyser:()=>Fu,AudioContext:()=>Ca,AudioListener:()=>Uu,AudioLoader:()=>Du,AxesHelper:()=>ld,BackSide:()=>Ze,BasicDepthPacking:()=>dp,BasicShadowMap:()=>Vf,BatchedMesh:()=>bl,Bone:()=>Qr,BooleanKeyframeTrack:()=>Jn,Box2:()=>Zu,Box3:()=>Ie,Box3Helper:()=>rd,BoxGeometry:()=>hi,BoxHelper:()=>sd,BufferAttribute:()=>se,BufferGeometry:()=>Ht,BufferGeometryLoader:()=>ec,ByteType:()=>Bh,Cache:()=>xn,Camera:()=>Bs,CameraHelper:()=>id,CanvasTexture:()=>yu,CapsuleGeometry:()=>sa,CatmullRomCurve3:()=>Rl,CineonToneMapping:()=>Lr,CircleGeometry:()=>ra,ClampToEdgeWrapping:()=>Nh,Clock:()=>Zs,Color:()=>dt,ColorKeyframeTrack:()=>Ea,ColorManagement:()=>Kt,CompressedArrayTexture:()=>xu,CompressedCubeTexture:()=>vu,CompressedTexture:()=>Hs,CompressedTextureLoader:()=>wu,ConeGeometry:()=>Vs,ConstantAlphaFactor:()=>Rh,ConstantColorFactor:()=>Ah,Controls:()=>Yi,CubeCamera:()=>gl,CubeReflectionMapping:()=>Oi,CubeRefractionMapping:()=>oi,CubeTexture:()=>Vi,CubeTextureLoader:()=>Au,CubeUVReflectionMapping:()=>Ps,CubicBezierCurve:()=>oa,CubicBezierCurve3:()=>Pl,CubicInterpolant:()=>Gl,CullFaceBack:()=>wo,CullFaceFront:()=>ch,CullFaceFrontBack:()=>Gf,CullFaceNone:()=>lh,Curve:()=>nn,CurvePath:()=>Dl,CustomBlending:()=>uh,CustomToneMapping:()=>Nr,CylinderGeometry:()=>Gs,Cylindrical:()=>Yu,Data3DTexture:()=>Fs,DataArrayTexture:()=>Ns,DataTexture:()=>cn,DataTextureLoader:()=>Cu,DataUtils:()=>lu,DecrementStencilOp:()=>vp,DecrementWrapStencilOp:()=>Mp,DefaultLoadingManager:()=>Tu,DepthFormat:()=>Hr,DepthStencilFormat:()=>Ls,DepthTexture:()=>na,DetachedBindMode:()=>Xf,DirectionalLight:()=>Jl,DirectionalLightHelper:()=>nd,DiscreteInterpolant:()=>Vl,DodecahedronGeometry:()=>aa,DoubleSide:()=>Mn,DstAlphaFactor:()=>Sh,DstColorFactor:()=>Th,DynamicCopyUsage:()=>Bp,DynamicDrawUsage:()=>Dp,DynamicReadUsage:()=>Np,EdgesGeometry:()=>Al,EllipseCurve:()=>Ws,EqualCompare:()=>Qh,EqualDepth:()=>Ar,EqualStencilFunc:()=>Ep,EquirectangularReflectionMapping:()=>Br,EquirectangularRefractionMapping:()=>zr,Euler:()=>Be,EventDispatcher:()=>un,ExternalTexture:()=>ia,ExtrudeGeometry:()=>da,FileLoader:()=>vn,Float16BufferAttribute:()=>pu,Float32BufferAttribute:()=>Mt,FloatType:()=>Yn,Fog:()=>$r,FogExp2:()=>Jr,FramebufferTexture:()=>_u,FrontSide:()=>Ni,Frustum:()=>ui,FrustumArray:()=>ta,GLBufferAttribute:()=>Wu,GLSL1:()=>kp,GLSL3:()=>dl,GreaterCompare:()=>jh,GreaterDepth:()=>Rr,GreaterEqualCompare:()=>eu,GreaterEqualDepth:()=>Cr,GreaterEqualStencilFunc:()=>Rp,GreaterStencilFunc:()=>Ap,GridHelper:()=>td,Group:()=>si,HalfFloatType:()=>hn,HemisphereLight:()=>Xl,HemisphereLightHelper:()=>ju,IcosahedronGeometry:()=>fa,ImageBitmapLoader:()=>Iu,ImageLoader:()=>Ui,ImageUtils:()=>ml,IncrementStencilOp:()=>xp,IncrementWrapStencilOp:()=>yp,InstancedBufferAttribute:()=>ai,InstancedBufferGeometry:()=>tc,InstancedInterleavedBuffer:()=>Vu,InstancedMesh:()=>Sl,Int16BufferAttribute:()=>du,Int32BufferAttribute:()=>fu,Int8BufferAttribute:()=>cu,IntType:()=>Po,InterleavedBuffer:()=>ks,InterleavedBufferAttribute:()=>ri,Interpolant:()=>Xi,InterpolateDiscrete:()=>ep,InterpolateLinear:()=>np,InterpolateSmooth:()=>ip,InterpolationSamplingMode:()=>Wp,InterpolationSamplingType:()=>Vp,InvertStencilOp:()=>Sp,KeepStencilOp:()=>gp,KeyframeTrack:()=>Je,LOD:()=>yl,LatheGeometry:()=>pa,Layers:()=>Os,LessCompare:()=>Kh,LessDepth:()=>wr,LessEqualCompare:()=>ul,LessEqualDepth:()=>Rs,LessEqualStencilFunc:()=>wp,LessStencilFunc:()=>Tp,Light:()=>Un,LightProbe:()=>jl,Line:()=>Pn,Line3:()=>Ju,LineBasicMaterial:()=>Ue,LineCurve:()=>la,LineCurve3:()=>Il,LineDashedMaterial:()=>Hl,LineLoop:()=>Tl,LineSegments:()=>fn,LinearFilter:()=>li,LinearInterpolant:()=>Ta,LinearMipMapLinearFilter:()=>$f,LinearMipMapNearestFilter:()=>Jf,LinearMipmapLinearFilter:()=>zi,LinearMipmapNearestFilter:()=>kr,LinearSRGBColorSpace:()=>Us,LinearToneMapping:()=>Ir,LinearTransfer:()=>hl,Loader:()=>ke,LoaderUtils:()=>br,LoadingManager:()=>wa,LoopOnce:()=>Qf,LoopPingPong:()=>tp,LoopRepeat:()=>jf,MOUSE:()=>Wn,Material:()=>Le,MaterialLoader:()=>Aa,MathUtils:()=>pl,Matrix2:()=>oc,Matrix3:()=>Vt,Matrix4:()=>Bt,MaxEquation:()=>mh,Mesh:()=>pe,MeshBasicMaterial:()=>dn,MeshDepthMaterial:()=>Sa,MeshDistanceMaterial:()=>ba,MeshLambertMaterial:()=>zl,MeshMatcapMaterial:()=>kl,MeshNormalMaterial:()=>Bl,MeshPhongMaterial:()=>Fl,MeshPhysicalMaterial:()=>Nl,MeshStandardMaterial:()=>Ma,MeshToonMaterial:()=>Ol,MinEquation:()=>ph,MirroredRepeatWrapping:()=>Fh,MixOperation:()=>Dh,MultiplyBlending:()=>Ro,MultiplyOperation:()=>Ih,NearestFilter:()=>Bi,NearestMipMapLinearFilter:()=>Zf,NearestMipMapNearestFilter:()=>Yf,NearestMipmapLinearFilter:()=>Is,NearestMipmapNearestFilter:()=>Oh,NeutralToneMapping:()=>Or,NeverCompare:()=>$h,NeverDepth:()=>Tr,NeverStencilFunc:()=>bp,NoBlending:()=>Sn,NoColorSpace:()=>ci,NoToneMapping:()=>In,NormalAnimationBlendMode:()=>op,NormalBlending:()=>As,NotEqualCompare:()=>tu,NotEqualDepth:()=>Pr,NotEqualStencilFunc:()=>Cp,NumberKeyframeTrack:()=>Ii,Object3D:()=>ne,ObjectLoader:()=>Pu,ObjectSpaceNormalMap:()=>Zh,OctahedronGeometry:()=>Xs,OneFactor:()=>_h,OneMinusConstantAlphaFactor:()=>Ph,OneMinusConstantColorFactor:()=>Ch,OneMinusDstAlphaFactor:()=>bh,OneMinusDstColorFactor:()=>Eh,OneMinusSrcAlphaFactor:()=>Mh,OneMinusSrcColorFactor:()=>vh,OrthographicCamera:()=>di,PCFShadowMap:()=>Ao,PCFSoftShadowMap:()=>hh,PMREMGenerator:()=>dc,Path:()=>Es,PerspectiveCamera:()=>Te,Plane:()=>on,PlaneGeometry:()=>Wi,PlaneHelper:()=>ad,PointLight:()=>Zl,PointLightHelper:()=>Qu,Points:()=>El,PointsMaterial:()=>ea,PolarGridHelper:()=>ed,PolyhedronGeometry:()=>Zn,PositionalAudio:()=>Nu,PropertyBinding:()=>te,PropertyMixer:()=>sc,QuadraticBezierCurve:()=>ca,QuadraticBezierCurve3:()=>ha,Quaternion:()=>Ee,QuaternionKeyframeTrack:()=>qi,QuaternionLinearInterpolant:()=>Wl,RED_GREEN_RGTC2_Format:()=>ll,RED_RGTC1_Format:()=>al,REVISION:()=>oh,RGBADepthPacking:()=>qh,RGBAFormat:()=>bn,RGBAIntegerFormat:()=>No,RGBA_ASTC_10x10_Format:()=>tl,RGBA_ASTC_10x5_Format:()=>Ko,RGBA_ASTC_10x6_Format:()=>Qo,RGBA_ASTC_10x8_Format:()=>jo,RGBA_ASTC_12x10_Format:()=>el,RGBA_ASTC_12x12_Format:()=>nl,RGBA_ASTC_4x4_Format:()=>Vo,RGBA_ASTC_5x4_Format:()=>Wo,RGBA_ASTC_5x5_Format:()=>Xo,RGBA_ASTC_6x5_Format:()=>qo,RGBA_ASTC_6x6_Format:()=>Yo,RGBA_ASTC_8x5_Format:()=>Zo,RGBA_ASTC_8x6_Format:()=>Jo,RGBA_ASTC_8x8_Format:()=>$o,RGBA_BPTC_Format:()=>il,RGBA_ETC2_EAC_Format:()=>Go,RGBA_PVRTC_2BPPV1_Format:()=>zo,RGBA_PVRTC_4BPPV1_Format:()=>Bo,RGBA_S3TC_DXT1_Format:()=>Vr,RGBA_S3TC_DXT3_Format:()=>Wr,RGBA_S3TC_DXT5_Format:()=>Xr,RGBDepthPacking:()=>fp,RGBFormat:()=>Vh,RGBIntegerFormat:()=>Kf,RGB_BPTC_SIGNED_Format:()=>sl,RGB_BPTC_UNSIGNED_Format:()=>rl,RGB_ETC1_Format:()=>ko,RGB_ETC2_Format:()=>Ho,RGB_PVRTC_2BPPV1_Format:()=>Oo,RGB_PVRTC_4BPPV1_Format:()=>Fo,RGB_S3TC_DXT1_Format:()=>Gr,RGDepthPacking:()=>pp,RGFormat:()=>Xh,RGIntegerFormat:()=>Uo,RawShaderMaterial:()=>Ys,Ray:()=>Dn,Raycaster:()=>Xu,RectAreaLight:()=>Kl,RedFormat:()=>Wh,RedIntegerFormat:()=>Lo,ReinhardToneMapping:()=>Dr,RenderTarget:()=>qr,RenderTarget3D:()=>Hu,RepeatWrapping:()=>Uh,ReplaceStencilOp:()=>_p,ReverseSubtractEquation:()=>fh,RingGeometry:()=>ma,SIGNED_RED_GREEN_RGTC2_Format:()=>cl,SIGNED_RED_RGTC1_Format:()=>ol,SRGBColorSpace:()=>Jh,SRGBTransfer:()=>re,Scene:()=>xl,ShaderChunk:()=>Jt,ShaderLib:()=>Tn,ShaderMaterial:()=>Se,ShadowMaterial:()=>Ul,Shape:()=>Vn,ShapeGeometry:()=>ga,ShapePath:()=>cd,ShapeUtils:()=>ln,ShortType:()=>zh,Skeleton:()=>jr,SkeletonHelper:()=>Ku,SkinnedMesh:()=>Ml,Source:()=>Rn,Sphere:()=>we,SphereGeometry:()=>qs,Spherical:()=>Js,SphericalHarmonics3:()=>Ql,SplineCurve:()=>ua,SpotLight:()=>Yl,SpotLightHelper:()=>$u,Sprite:()=>vl,SpriteMaterial:()=>Kr,SrcAlphaFactor:()=>yh,SrcAlphaSaturateFactor:()=>wh,SrcColorFactor:()=>xh,StaticCopyUsage:()=>Op,StaticDrawUsage:()=>Ip,StaticReadUsage:()=>Up,StereoCamera:()=>Lu,StreamCopyUsage:()=>zp,StreamDrawUsage:()=>Lp,StreamReadUsage:()=>Fp,StringKeyframeTrack:()=>$n,SubtractEquation:()=>dh,SubtractiveBlending:()=>Co,TOUCH:()=>Xn,TangentSpaceNormalMap:()=>Yh,TetrahedronGeometry:()=>_a,Texture:()=>xe,TextureLoader:()=>Ru,TextureUtils:()=>hd,Timer:()=>qu,TimestampQuery:()=>Gp,TorusGeometry:()=>xa,TorusKnotGeometry:()=>va,Triangle:()=>We,TriangleFanDrawMode:()=>up,TriangleStripDrawMode:()=>hp,TrianglesDrawMode:()=>cp,TubeGeometry:()=>ya,UVMapping:()=>qf,Uint16BufferAttribute:()=>Yr,Uint32BufferAttribute:()=>Zr,Uint8BufferAttribute:()=>hu,Uint8ClampedBufferAttribute:()=>uu,Uniform:()=>ac,UniformsGroup:()=>Gu,UniformsLib:()=>gt,UniformsUtils:()=>Ln,UnsignedByteType:()=>qn,UnsignedInt101111Type:()=>Hh,UnsignedInt248Type:()=>Hi,UnsignedInt5999Type:()=>kh,UnsignedIntType:()=>ki,UnsignedShort4444Type:()=>Io,UnsignedShort5551Type:()=>Do,UnsignedShortType:()=>Ds,VSMShadowMap:()=>yn,Vector2:()=>H,Vector3:()=>E,Vector4:()=>ee,VectorKeyframeTrack:()=>Di,VideoFrameTexture:()=>gu,VideoTexture:()=>wl,WebGL3DRenderTarget:()=>ou,WebGLArrayRenderTarget:()=>au,WebGLCoordinateSystem:()=>fl,WebGLCubeRenderTarget:()=>_l,WebGLRenderTarget:()=>De,WebGLRenderer:()=>Wm,WebGLUtils:()=>Hm,WebGPUCoordinateSystem:()=>Hp,WebXRController:()=>zs,WireframeGeometry:()=>Ll,WrapAroundEnding:()=>ap,ZeroCurvatureEnding:()=>sp,ZeroFactor:()=>gh,ZeroSlopeEnding:()=>rp,ZeroStencilOp:()=>mp,createCanvasElement:()=>ru});var oh="180",Wn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Xn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},lh=0,wo=1,ch=2,Gf=3,Vf=0,Ao=1,hh=2,yn=3,Ni=0,Ze=1,Mn=2,Sn=0,As=1,Cs=2,Co=3,Ro=4,uh=5,Fi=100,dh=101,fh=102,ph=103,mh=104,gh=200,_h=201,xh=202,vh=203,yh=204,Mh=205,Sh=206,bh=207,Th=208,Eh=209,wh=210,Ah=211,Ch=212,Rh=213,Ph=214,Tr=0,Er=1,wr=2,Rs=3,Ar=4,Cr=5,Rr=6,Pr=7,Ih=0,Dh=1,Lh=2,In=0,Ir=1,Dr=2,Lr=3,Ur=4,Nr=5,Fr=6,Or=7,Wf="attached",Xf="detached",qf=300,Oi=301,oi=302,Br=303,zr=304,Ps=306,Uh=1000,Nh=1001,Fh=1002,Bi=1003,Oh=1004,Yf=1004,Is=1005,Zf=1005,li=1006,kr=1007,Jf=1007,zi=1008,$f=1008,qn=1009,Bh=1010,zh=1011,Ds=1012,Po=1013,ki=1014,Yn=1015,hn=1016,Io=1017,Do=1018,Hi=1020,kh=35902,Hh=35899,Gh=1021,Vh=1022,bn=1023,Hr=1026,Ls=1027,Wh=1028,Lo=1029,Xh=1030,Uo=1031,Kf=1032,No=1033,Gr=33776,Vr=33777,Wr=33778,Xr=33779,Fo=35840,Oo=35841,Bo=35842,zo=35843,ko=36196,Ho=37492,Go=37496,Vo=37808,Wo=37809,Xo=37810,qo=37811,Yo=37812,Zo=37813,Jo=37814,$o=37815,Ko=37816,Qo=37817,jo=37818,tl=37819,el=37820,nl=37821,il=36492,sl=36494,rl=36495,al=36283,ol=36284,ll=36285,cl=36286,Qf=2200,jf=2201,tp=2202,ep=2300,np=2301,ip=2302,sp=2400,rp=2401,ap=2402,op=2500,lp=2501,cp=0,hp=1,up=2,dp=3200,qh=3201,fp=3202,pp=3203,Yh=0,Zh=1,ci="",Jh="srgb",Us="srgb-linear",hl="linear",re="srgb",mp=0,gp=7680,_p=7681,xp=7682,vp=7683,yp=34055,Mp=34056,Sp=5386,bp=512,Tp=513,Ep=514,wp=515,Ap=516,Cp=517,Rp=518,Pp=519,$h=512,Kh=513,Qh=514,ul=515,jh=516,tu=517,eu=518,nu=519,Ip=35044,Dp=35048,Lp=35040,Up=35045,Np=35049,Fp=35041,Op=35046,Bp=35050,zp=35042,kp="100",dl="300 es",fl=2000,Hp=2001,Gp={COMPUTE:"compute",RENDER:"render"},Vp={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},Wp={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"};class un{addEventListener(t,e){if(this._listeners===void 0)this._listeners={};let n=this._listeners;if(n[t]===void 0)n[t]=[];if(n[t].indexOf(e)===-1)n[t].push(e)}hasEventListener(t,e){let n=this._listeners;if(n===void 0)return!1;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);if(s!==-1)i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}}var Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ud=1234567,Ci=Math.PI/180,Ri=180/Math.PI;function en(){let t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ne[t&255]+Ne[t>>8&255]+Ne[t>>16&255]+Ne[t>>24&255]+"-"+Ne[e&255]+Ne[e>>8&255]+"-"+Ne[e>>16&15|64]+Ne[e>>24&255]+"-"+Ne[n&63|128]+Ne[n>>8&255]+"-"+Ne[n>>16&255]+Ne[n>>24&255]+Ne[i&255]+Ne[i>>8&255]+Ne[i>>16&255]+Ne[i>>24&255]).toLowerCase()}function Ot(t,e,n){return Math.max(e,Math.min(n,t))}function iu(t,e){return(t%e+e)%e}function lg(t,e,n,i,s){return i+(t-e)*(s-i)/(n-e)}function cg(t,e,n){if(t!==e)return(n-t)/(e-t);else return 0}function _r(t,e,n){return(1-n)*t+n*e}function hg(t,e,n,i){return _r(t,e,1-Math.exp(-n*i))}function ug(t,e=1){return e-Math.abs(iu(t,e*2)-e)}function dg(t,e,n){if(t<=e)return 0;if(t>=n)return 1;return t=(t-e)/(n-e),t*t*(3-2*t)}function fg(t,e,n){if(t<=e)return 0;if(t>=n)return 1;return t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10)}function pg(t,e){return t+Math.floor(Math.random()*(e-t+1))}function mg(t,e){return t+Math.random()*(e-t)}function gg(t){return t*(0.5-Math.random())}function _g(t){if(t!==void 0)Ud=t;let e=Ud+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function xg(t){return t*Ci}function vg(t){return t*Ri}function yg(t){return(t&t-1)===0&&t!==0}function Mg(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function Sg(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function bg(t,e,n,i,s){let{cos:r,sin:a}=Math,o=r(n/2),l=a(n/2),c=r((e+i)/2),h=a((e+i)/2),u=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),g=a((i-e)/2);switch(s){case"XYX":t.set(o*h,l*u,l*d,o*c);break;case"YZY":t.set(l*d,o*h,l*u,o*c);break;case"ZXZ":t.set(l*u,l*d,o*h,o*c);break;case"XZX":t.set(o*h,l*g,l*f,o*c);break;case"YXY":t.set(l*f,o*h,l*g,o*c);break;case"ZYZ":t.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ve(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw Error("Invalid component type.")}}function Yt(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw Error("Invalid component type.")}}var pl={DEG2RAD:Ci,RAD2DEG:Ri,generateUUID:en,clamp:Ot,euclideanModulo:iu,mapLinear:lg,inverseLerp:cg,lerp:_r,damp:hg,pingpong:ug,smoothstep:dg,smootherstep:fg,randInt:pg,randFloat:mg,randFloatSpread:gg,seededRandom:_g,degToRad:xg,radToDeg:vg,isPowerOfTwo:yg,ceilPowerOfTwo:Mg,floorPowerOfTwo:Sg,setQuaternionFromProperEuler:bg,normalize:Yt,denormalize:Ve};class H{constructor(t=0,e=0){H.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ot(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ee{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let o=n[i+0],l=n[i+1],c=n[i+2],h=n[i+3],u=s[r+0],d=s[r+1],f=s[r+2],g=s[r+3];if(a===0){t[e+0]=o,t[e+1]=l,t[e+2]=c,t[e+3]=h;return}if(a===1){t[e+0]=u,t[e+1]=d,t[e+2]=f,t[e+3]=g;return}if(h!==g||o!==u||l!==d||c!==f){let _=1-a,m=o*u+l*d+c*f+h*g,p=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){let M=Math.sqrt(v),R=Math.atan2(M,m*p);_=Math.sin(_*R)/M,a=Math.sin(a*R)/M}let x=a*p;if(o=o*_+u*x,l=l*_+d*x,c=c*_+f*x,h=h*_+g*x,_===1-a){let M=1/Math.sqrt(o*o+l*l+c*c+h*h);o*=M,l*=M,c*=M,h*=M}}t[e]=o,t[e+1]=l,t[e+2]=c,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,s,r){let a=n[i],o=n[i+1],l=n[i+2],c=n[i+3],h=s[r],u=s[r+1],d=s[r+2],f=s[r+3];return t[e]=a*f+c*h+o*d-l*u,t[e+1]=o*f+c*u+l*h-a*d,t[e+2]=l*f+c*d+a*u-o*h,t[e+3]=c*f-a*h-o*u-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let{_x:n,_y:i,_z:s,_order:r}=t,{cos:a,sin:o}=Math,l=a(n/2),c=a(i/2),h=a(s/2),u=o(n/2),d=o(i/2),f=o(s/2);switch(r){case"XYZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"YXZ":this._x=u*c*h+l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"ZXY":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h-u*d*f;break;case"ZYX":this._x=u*c*h-l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h+u*d*f;break;case"YZX":this._x=u*c*h+l*d*f,this._y=l*d*h+u*c*f,this._z=l*c*f-u*d*h,this._w=l*c*h-u*d*f;break;case"XZY":this._x=u*c*h-l*d*f,this._y=l*d*h-u*c*f,this._z=l*c*f+u*d*h,this._w=l*c*h+u*d*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}if(e===!0)this._onChangeCallback();return this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10],u=n+a+h;if(u>0){let d=0.5/Math.sqrt(u+1);this._w=0.25/d,this._x=(c-o)*d,this._y=(s-l)*d,this._z=(r-i)*d}else if(n>a&&n>h){let d=2*Math.sqrt(1+n-a-h);this._w=(c-o)/d,this._x=0.25*d,this._y=(i+r)/d,this._z=(s+l)/d}else if(a>h){let d=2*Math.sqrt(1+a-n-h);this._w=(s-l)/d,this._x=(i+r)/d,this._y=0.25*d,this._z=(o+c)/d}else{let d=2*Math.sqrt(1+h-n-a);this._w=(r-i)/d,this._x=(s+l)/d,this._y=(o+c)/d,this._z=0.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;if(n<0.00000001)if(n=0,Math.abs(t.x)>Math.abs(t.z))this._x=-t.y,this._y=t.x,this._z=0,this._w=n;else this._x=0,this._y=-t.z,this._z=t.y,this._w=n;else this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n;return this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ot(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();if(t===0)this._x=0,this._y=0,this._z=0,this._w=1;else t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t;return this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let{_x:n,_y:i,_z:s,_w:r}=t,{_x:a,_y:o,_z:l,_w:c}=e;return this._x=n*c+r*a+i*l-s*o,this._y=i*c+r*o+s*a-n*l,this._z=s*c+r*l+n*o-i*a,this._w=r*c-n*a-i*o-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,r=this._w,a=r*t._w+n*t._x+i*t._y+s*t._z;if(a<0)this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a;else this.copy(t);if(a>=1)return this._w=r,this._x=n,this._y=i,this._z=s,this;let o=1-a*a;if(o<=Number.EPSILON){let d=1-e;return this._w=d*r+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}let l=Math.sqrt(o),c=Math.atan2(l,a),h=Math.sin((1-e)*c)/l,u=Math.sin(e*c)/l;return this._w=r*h+this._w*u,this._x=n*h+this._x*u,this._y=i*h+this._y*u,this._z=s*h+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class E{constructor(t=0,e=0,n=0){E.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){if(n===void 0)n=this.z;return this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nd.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nd.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,{x:s,y:r,z:a,w:o}=t,l=2*(r*i-a*n),c=2*(a*e-s*i),h=2*(s*n-r*e);return this.x=e+o*l+r*h-a*c,this.y=n+o*c+a*l-s*h,this.z=i+o*h+s*c-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let{x:n,y:i,z:s}=t,{x:r,y:a,z:o}=e;return this.x=i*o-s*a,this.y=s*r-n*o,this.z=n*a-i*r,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xc.copy(this).projectOnVector(t),this.sub(xc)}reflect(t){return this.sub(xc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Ot(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var xc=new E,Nd=new Ee;class Vt{constructor(t,e,n,i,s,r,a,o,l){if(Vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0)this.set(t,e,n,i,s,r,a,o,l)}set(t,e,n,i,s,r,a,o,l){let c=this.elements;return c[0]=t,c[1]=i,c[2]=a,c[3]=e,c[4]=s,c[5]=o,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],o=n[6],l=n[1],c=n[4],h=n[7],u=n[2],d=n[5],f=n[8],g=i[0],_=i[3],m=i[6],p=i[1],v=i[4],x=i[7],M=i[2],R=i[5],w=i[8];return s[0]=r*g+a*p+o*M,s[3]=r*_+a*v+o*R,s[6]=r*m+a*x+o*w,s[1]=l*g+c*p+h*M,s[4]=l*_+c*v+h*R,s[7]=l*m+c*x+h*w,s[2]=u*g+d*p+f*M,s[5]=u*_+d*v+f*R,s[8]=u*m+d*x+f*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8];return e*r*c-e*a*l-n*s*c+n*a*o+i*s*l-i*r*o}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=c*r-a*l,u=a*o-c*s,d=l*s-r*o,f=e*h+n*u+i*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/f;return t[0]=h*g,t[1]=(i*l-c*n)*g,t[2]=(a*n-i*r)*g,t[3]=u*g,t[4]=(c*e-i*o)*g,t[5]=(i*s-a*e)*g,t[6]=d*g,t[7]=(n*o-l*e)*g,t[8]=(r*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){let o=Math.cos(s),l=Math.sin(s);return this.set(n*o,n*l,-n*(o*r+l*a)+r+t,-i*l,i*o,-i*(-l*r+o*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(vc.makeScale(t,e)),this}rotate(t){return this.premultiply(vc.makeRotation(-t)),this}translate(t,e){return this.premultiply(vc.makeTranslation(t,e)),this}makeTranslation(t,e){if(t.isVector2)this.set(1,0,t.x,0,1,t.y,0,0,1);else this.set(1,0,t,0,1,e,0,0,1);return this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}var vc=new Vt;function su(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}var Tg={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Ms(t,e){return new Tg[t](e)}function bs(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function ru(){let t=bs("canvas");return t.style.display="block",t}var Fd={};function Ts(t){if(t in Fd)return;Fd[t]=!0,console.warn(t)}function Xp(t,e,n){return new Promise(function(i,s){function r(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:s();break;case t.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}var Od=new Vt().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),Bd=new Vt().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function Eg(){let t={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(s,r,a){if(this.enabled===!1||r===a||!r||!a)return s;if(this.spaces[r].transfer==="srgb")s.r=Gn(s.r),s.g=Gn(s.g),s.b=Gn(s.b);if(this.spaces[r].primaries!==this.spaces[a].primaries)s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ);if(this.spaces[a].transfer==="srgb")s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b);return s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){if(s==="")return"linear";return this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ts("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ts("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(s,r)}},e=[0.64,0.33,0.3,0.6,0.15,0.06],n=[0.2126,0.7152,0.0722],i=[0.3127,0.329];return t.define({["srgb-linear"]:{primaries:e,whitePoint:i,transfer:"linear",toXYZ:Od,fromXYZ:Bd,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:e,whitePoint:i,transfer:"srgb",toXYZ:Od,fromXYZ:Bd,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),t}var Kt=Eg();function Gn(t){return t<0.04045?t*0.0773993808:Math.pow(t*0.9478672986+0.0521327014,2.4)}function Ss(t){return t<0.0031308?t*12.92:1.055*Math.pow(t,0.41666)-0.055}var es;class ml{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src))return t.src;if(typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{if(es===void 0)es=bs("canvas");es.width=t.width,es.height=t.height;let i=es.getContext("2d");if(t instanceof ImageData)i.putImageData(t,0,0);else i.drawImage(t,0,0,t.width,t.height);n=es}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=bs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Gn(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)if(e instanceof Uint8Array||e instanceof Uint8ClampedArray)e[n]=Math.floor(Gn(e[n]/255)*255);else e[n]=Gn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}var wg=0;class Rn{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=en(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;if(typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement)t.set(e.videoWidth,e.videoHeight,0);else if(e instanceof VideoFrame)t.set(e.displayHeight,e.displayWidth,0);else if(e!==null)t.set(e.width,e.height,e.depth||0);else t.set(0,0,0);return t}set needsUpdate(t){if(t===!0)this.version++}toJSON(t){let e=t===void 0||typeof t==="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)if(i[r].isDataTexture)s.push(yc(i[r].image));else s.push(yc(i[r]))}else s=yc(i);n.url=s}if(!e)t.images[this.uuid]=n;return n}}function yc(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap)return ml.getDataURL(t);else if(t.data)return{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name};else return console.warn("THREE.Texture: Unable to serialize Texture."),{}}var Ag=0,Mc=new E;class xe extends un{constructor(t=xe.DEFAULT_IMAGE,e=xe.DEFAULT_MAPPING,n=1001,i=1001,s=1006,r=1008,a=1023,o=1009,l=xe.DEFAULT_ANISOTROPY,c=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=en(),this.name="",this.source=new Rn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=t&&t.depth&&t.depth>1?!0:!1,this.pmremVersion=0}get width(){return this.source.getSize(Mc).x}get height(){return this.source.getSize(Mc).y}get depth(){return this.source.getSize(Mc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}if(i&&n&&(i.isVector2&&n.isVector2))i.copy(n);else if(i&&n&&(i.isVector3&&n.isVector3))i.copy(n);else if(i&&n&&(i.isMatrix3&&n.isMatrix3))i.copy(n);else this[e]=n}}toJSON(t){let e=t===void 0||typeof t==="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)n.userData=this.userData;if(!e)t.textures[this.uuid]=n;return n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==300)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case 1000:t.x=t.x-Math.floor(t.x);break;case 1001:t.x=t.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(t.x)%2)===1)t.x=Math.ceil(t.x)-t.x;else t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case 1000:t.y=t.y-Math.floor(t.y);break;case 1001:t.y=t.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(t.y)%2)===1)t.y=Math.ceil(t.y)-t.y;else t.y=t.y-Math.floor(t.y);break}if(this.flipY)t.y=1-t.y;return t}set needsUpdate(t){if(t===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(t){if(t===!0)this.pmremVersion++}}xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=300;xe.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,i=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);if(e<0.0001)this.x=1,this.y=0,this.z=0;else this.x=t.x/e,this.y=t.y/e,this.z=t.z/e;return this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,r=0.01,a=0.1,o=t.elements,l=o[0],c=o[4],h=o[8],u=o[1],d=o[5],f=o[9],g=o[2],_=o[6],m=o[10];if(Math.abs(c-u)<0.01&&Math.abs(h-g)<0.01&&Math.abs(f-_)<0.01){if(Math.abs(c+u)<0.1&&Math.abs(h+g)<0.1&&Math.abs(f+_)<0.1&&Math.abs(l+d+m-3)<0.1)return this.set(1,0,0,0),this;e=Math.PI;let v=(l+1)/2,x=(d+1)/2,M=(m+1)/2,R=(c+u)/4,w=(h+g)/4,A=(f+_)/4;if(v>x&&v>M)if(v<0.01)n=0,i=0.707106781,s=0.707106781;else n=Math.sqrt(v),i=R/n,s=w/n;else if(x>M)if(x<0.01)n=0.707106781,i=0,s=0.707106781;else i=Math.sqrt(x),n=R/i,s=A/i;else if(M<0.01)n=0.707106781,i=0.707106781,s=0;else s=Math.sqrt(M),n=w/s,i=A/s;return this.set(n,i,s,e),this}let p=Math.sqrt((_-f)*(_-f)+(h-g)*(h-g)+(u-c)*(u-c));if(Math.abs(p)<0.001)p=1;return this.x=(_-f)/p,this.y=(h-g)/p,this.z=(u-c)/p,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ot(this.x,t.x,e.x),this.y=Ot(this.y,t.y,e.y),this.z=Ot(this.z,t.z,e.z),this.w=Ot(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ot(this.x,t,e),this.y=Ot(this.y,t,e),this.z=Ot(this.z,t,e),this.w=Ot(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Ot(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qr extends un{constructor(t=1,e=1,n={}){super();n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);let i={width:t,height:e,depth:n.depth},s=new xe(i);this.textures=[];let r=n.count;for(let a=0;a<r;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(t.mapping!==void 0)e.mapping=t.mapping;if(t.wrapS!==void 0)e.wrapS=t.wrapS;if(t.wrapT!==void 0)e.wrapT=t.wrapT;if(t.wrapR!==void 0)e.wrapR=t.wrapR;if(t.magFilter!==void 0)e.magFilter=t.magFilter;if(t.minFilter!==void 0)e.minFilter=t.minFilter;if(t.format!==void 0)e.format=t.format;if(t.type!==void 0)e.type=t.type;if(t.anisotropy!==void 0)e.anisotropy=t.anisotropy;if(t.colorSpace!==void 0)e.colorSpace=t.colorSpace;if(t.flipY!==void 0)e.flipY=t.flipY;if(t.generateMipmaps!==void 0)e.generateMipmaps=t.generateMipmaps;if(t.internalFormat!==void 0)e.internalFormat=t.internalFormat;for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(t!==null)t.renderTarget=this;this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Rn(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null)this.depthTexture=t.depthTexture.clone();return this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class De extends qr{constructor(t=1,e=1,n={}){super(t,e,n);this.isWebGLRenderTarget=!0}}class Ns extends xe{constructor(t=null,e=1,n=1,i=1){super(null);this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class au extends De{constructor(t=1,e=1,n=1,i={}){super(t,e,i);this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Ns(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Fs extends xe{constructor(t=null,e=1,n=1,i=1){super(null);this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ou extends De{constructor(t=1,e=1,n=1,i={}){super(t,e,i);this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Fs(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class Ie{constructor(t=new E(1/0,1/0,1/0),e=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=mn.copy(e).multiplyScalar(0.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++){if(t.isMesh===!0)t.getVertexPosition(r,mn);else mn.fromBufferAttribute(s,r);mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn)}else{if(t.boundingBox!==void 0){if(t.boundingBox===null)t.computeBoundingBox();Ua.copy(t.boundingBox)}else{if(n.boundingBox===null)n.computeBoundingBox();Ua.copy(n.boundingBox)}Ua.applyMatrix4(t.matrixWorld),this.union(Ua)}}let i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;if(t.normal.x>0)e=t.normal.x*this.min.x,n=t.normal.x*this.max.x;else e=t.normal.x*this.max.x,n=t.normal.x*this.min.x;if(t.normal.y>0)e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y;else e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y;if(t.normal.z>0)e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z;else e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z;return e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ir),Na.subVectors(this.max,ir),ns.subVectors(t.a,ir),is.subVectors(t.b,ir),ss.subVectors(t.c,ir),Kn.subVectors(is,ns),Qn.subVectors(ss,is),mi.subVectors(ns,ss);let e=[0,-Kn.z,Kn.y,0,-Qn.z,Qn.y,0,-mi.z,mi.y,Kn.z,0,-Kn.x,Qn.z,0,-Qn.x,mi.z,0,-mi.x,-Kn.y,Kn.x,0,-Qn.y,Qn.x,0,-mi.y,mi.x,0];if(!Sc(e,ns,is,ss,Na))return!1;if(e=[1,0,0,0,1,0,0,0,1],!Sc(e,ns,is,ss,Na))return!1;return Fa.crossVectors(Kn,Qn),e=[Fa.x,Fa.y,Fa.z],Sc(e,ns,is,ss,Na)}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){if(this.isEmpty())t.makeEmpty();else this.getCenter(t.center),t.radius=this.getSize(mn).length()*0.5;return t}intersect(t){if(this.min.max(t.min),this.max.min(t.max),this.isEmpty())this.makeEmpty();return this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){if(this.isEmpty())return this;return Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}var Nn=[new E,new E,new E,new E,new E,new E,new E,new E],mn=new E,Ua=new Ie,ns=new E,is=new E,ss=new E,Kn=new E,Qn=new E,mi=new E,ir=new E,Na=new E,Fa=new E,gi=new E;function Sc(t,e,n,i,s){for(let r=0,a=t.length-3;r<=a;r+=3){gi.fromArray(t,r);let o=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),l=e.dot(gi),c=n.dot(gi),h=i.dot(gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Cg=new Ie,sr=new E,bc=new E;class we{constructor(t=new E,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;if(e!==void 0)n.copy(e);else Cg.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);if(e.copy(t),n>this.radius*this.radius)e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center);return e}getBoundingBox(t){if(this.isEmpty())return t.makeEmpty(),t;return t.set(this.center,this.center),t.expandByScalar(this.radius),t}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;sr.subVectors(t,this.center);let e=sr.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*0.5;this.center.addScaledVector(sr,i/n),this.radius+=i}return this}union(t){if(t.isEmpty())return this;if(this.isEmpty())return this.copy(t),this;if(this.center.equals(t.center)===!0)this.radius=Math.max(this.radius,t.radius);else bc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(sr.copy(t.center).add(bc)),this.expandByPoint(sr.copy(t.center).sub(bc));return this}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}var Fn=new E,Tc=new E,Oa=new E,jn=new E,Ec=new E,Ba=new E,wc=new E;class Dn{constructor(t=new E,e=new E(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);if(n<0)return e.copy(this.origin);return e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Fn.subVectors(t,this.origin).dot(this.direction);if(e<0)return this.origin.distanceToSquared(t);return Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t)}distanceSqToSegment(t,e,n,i){Tc.copy(t).add(e).multiplyScalar(0.5),Oa.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(Tc);let s=t.distanceTo(e)*0.5,r=-this.direction.dot(Oa),a=jn.dot(this.direction),o=-jn.dot(Oa),l=jn.lengthSq(),c=Math.abs(1-r*r),h,u,d,f;if(c>0)if(h=r*o-a,u=r*a-o,f=s*c,h>=0)if(u>=-f)if(u<=f){let g=1/c;h*=g,u*=g,d=h*(h+r*u+2*a)+u*(r*h+u+2*o)+l}else u=s,h=Math.max(0,-(r*u+a)),d=-h*h+u*(u+2*o)+l;else u=-s,h=Math.max(0,-(r*u+a)),d=-h*h+u*(u+2*o)+l;else if(u<=-f)h=Math.max(0,-(-r*s+a)),u=h>0?-s:Math.min(Math.max(-s,-o),s),d=-h*h+u*(u+2*o)+l;else if(u<=f)h=0,u=Math.min(Math.max(-s,-o),s),d=u*(u+2*o)+l;else h=Math.max(0,-(r*s+a)),u=h>0?s:Math.min(Math.max(-s,-o),s),d=-h*h+u*(u+2*o)+l;else u=r>0?-s:s,h=Math.max(0,-(r*u+a)),d=-h*h+u*(u+2*o)+l;if(n)n.copy(this.origin).addScaledVector(this.direction,h);if(i)i.copy(Tc).addScaledVector(Oa,u);return d}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);let n=Fn.dot(this.direction),i=Fn.dot(Fn)-n*n,s=t.radius*t.radius;if(i>s)return null;let r=Math.sqrt(s-i),a=n-r,o=n+r;if(o<0)return null;if(a<0)return this.at(o,e);return this.at(a,e)}intersectsSphere(t){if(t.radius<0)return!1;return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0){if(t.distanceToPoint(this.origin)===0)return 0;return null}let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);if(n===null)return null;return this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);if(e===0)return!0;if(t.normal.dot(this.direction)*e<0)return!0;return!1}intersectBox(t,e){let n,i,s,r,a,o,l=1/this.direction.x,c=1/this.direction.y,h=1/this.direction.z,u=this.origin;if(l>=0)n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l;else n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l;if(c>=0)s=(t.min.y-u.y)*c,r=(t.max.y-u.y)*c;else s=(t.max.y-u.y)*c,r=(t.min.y-u.y)*c;if(n>r||s>i)return null;if(s>n||isNaN(n))n=s;if(r<i||isNaN(i))i=r;if(h>=0)a=(t.min.z-u.z)*h,o=(t.max.z-u.z)*h;else a=(t.max.z-u.z)*h,o=(t.min.z-u.z)*h;if(n>o||a>i)return null;if(a>n||n!==n)n=a;if(o<i||i!==i)i=o;if(i<0)return null;return this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,i,s){Ec.subVectors(e,t),Ba.subVectors(n,t),wc.crossVectors(Ec,Ba);let r=this.direction.dot(wc),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;jn.subVectors(this.origin,t);let o=a*this.direction.dot(Ba.crossVectors(jn,Ba));if(o<0)return null;let l=a*this.direction.dot(Ec.cross(jn));if(l<0)return null;if(o+l>r)return null;let c=-a*jn.dot(wc);if(c<0)return null;return this.at(c/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Bt{constructor(t,e,n,i,s,r,a,o,l,c,h,u,d,f,g,_){if(Bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0)this.set(t,e,n,i,s,r,a,o,l,c,h,u,d,f,g,_)}set(t,e,n,i,s,r,a,o,l,c,h,u,d,f,g,_){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=s,m[5]=r,m[9]=a,m[13]=o,m[2]=l,m[6]=c,m[10]=h,m[14]=u,m[3]=d,m[7]=f,m[11]=g,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bt().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/rs.setFromMatrixColumn(t,0).length(),s=1/rs.setFromMatrixColumn(t,1).length(),r=1/rs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,{x:n,y:i,z:s}=t,r=Math.cos(n),a=Math.sin(n),o=Math.cos(i),l=Math.sin(i),c=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){let u=r*c,d=r*h,f=a*c,g=a*h;e[0]=o*c,e[4]=-o*h,e[8]=l,e[1]=d+f*l,e[5]=u-g*l,e[9]=-a*o,e[2]=g-u*l,e[6]=f+d*l,e[10]=r*o}else if(t.order==="YXZ"){let u=o*c,d=o*h,f=l*c,g=l*h;e[0]=u+g*a,e[4]=f*a-d,e[8]=r*l,e[1]=r*h,e[5]=r*c,e[9]=-a,e[2]=d*a-f,e[6]=g+u*a,e[10]=r*o}else if(t.order==="ZXY"){let u=o*c,d=o*h,f=l*c,g=l*h;e[0]=u-g*a,e[4]=-r*h,e[8]=f+d*a,e[1]=d+f*a,e[5]=r*c,e[9]=g-u*a,e[2]=-r*l,e[6]=a,e[10]=r*o}else if(t.order==="ZYX"){let u=r*c,d=r*h,f=a*c,g=a*h;e[0]=o*c,e[4]=f*l-d,e[8]=u*l+g,e[1]=o*h,e[5]=g*l+u,e[9]=d*l-f,e[2]=-l,e[6]=a*o,e[10]=r*o}else if(t.order==="YZX"){let u=r*o,d=r*l,f=a*o,g=a*l;e[0]=o*c,e[4]=g-u*h,e[8]=f*h+d,e[1]=h,e[5]=r*c,e[9]=-a*c,e[2]=-l*c,e[6]=d*h+f,e[10]=u-g*h}else if(t.order==="XZY"){let u=r*o,d=r*l,f=a*o,g=a*l;e[0]=o*c,e[4]=-h,e[8]=l*c,e[1]=u*h+g,e[5]=r*c,e[9]=d*h-f,e[2]=f*h-d,e[6]=a*c,e[10]=g*h+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Rg,t,Pg)}lookAt(t,e,n){let i=this.elements;if(je.subVectors(t,e),je.lengthSq()===0)je.z=1;if(je.normalize(),ti.crossVectors(n,je),ti.lengthSq()===0){if(Math.abs(n.z)===1)je.x+=0.0001;else je.z+=0.0001;je.normalize(),ti.crossVectors(n,je)}return ti.normalize(),za.crossVectors(je,ti),i[0]=ti.x,i[4]=za.x,i[8]=je.x,i[1]=ti.y,i[5]=za.y,i[9]=je.y,i[2]=ti.z,i[6]=za.z,i[10]=je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],o=n[8],l=n[12],c=n[1],h=n[5],u=n[9],d=n[13],f=n[2],g=n[6],_=n[10],m=n[14],p=n[3],v=n[7],x=n[11],M=n[15],R=i[0],w=i[4],A=i[8],L=i[12],S=i[1],T=i[5],I=i[9],k=i[13],V=i[2],B=i[6],K=i[10],W=i[14],nt=i[3],G=i[7],ft=i[11],pt=i[15];return s[0]=r*R+a*S+o*V+l*nt,s[4]=r*w+a*T+o*B+l*G,s[8]=r*A+a*I+o*K+l*ft,s[12]=r*L+a*k+o*W+l*pt,s[1]=c*R+h*S+u*V+d*nt,s[5]=c*w+h*T+u*B+d*G,s[9]=c*A+h*I+u*K+d*ft,s[13]=c*L+h*k+u*W+d*pt,s[2]=f*R+g*S+_*V+m*nt,s[6]=f*w+g*T+_*B+m*G,s[10]=f*A+g*I+_*K+m*ft,s[14]=f*L+g*k+_*W+m*pt,s[3]=p*R+v*S+x*V+M*nt,s[7]=p*w+v*T+x*B+M*G,s[11]=p*A+v*I+x*K+M*ft,s[15]=p*L+v*k+x*W+M*pt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],o=t[9],l=t[13],c=t[2],h=t[6],u=t[10],d=t[14],f=t[3],g=t[7],_=t[11],m=t[15];return f*(+s*o*h-i*l*h-s*a*u+n*l*u+i*a*d-n*o*d)+g*(+e*o*d-e*l*u+s*r*u-i*r*d+i*l*c-s*o*c)+_*(+e*l*h-e*a*d-s*r*h+n*r*d+s*a*c-n*l*c)+m*(-i*a*c-e*o*h+e*a*u+i*r*h-n*r*u+n*o*c)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;if(t.isVector3)i[12]=t.x,i[13]=t.y,i[14]=t.z;else i[12]=t,i[13]=e,i[14]=n;return this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=t[9],u=t[10],d=t[11],f=t[12],g=t[13],_=t[14],m=t[15],p=h*_*l-g*u*l+g*o*d-a*_*d-h*o*m+a*u*m,v=f*u*l-c*_*l-f*o*d+r*_*d+c*o*m-r*u*m,x=c*g*l-f*h*l+f*a*d-r*g*d-c*a*m+r*h*m,M=f*h*o-c*g*o-f*a*u+r*g*u+c*a*_-r*h*_,R=e*p+n*v+i*x+s*M;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/R;return t[0]=p*w,t[1]=(g*u*s-h*_*s-g*i*d+n*_*d+h*i*m-n*u*m)*w,t[2]=(a*_*s-g*o*s+g*i*l-n*_*l-a*i*m+n*o*m)*w,t[3]=(h*o*s-a*u*s-h*i*l+n*u*l+a*i*d-n*o*d)*w,t[4]=v*w,t[5]=(c*_*s-f*u*s+f*i*d-e*_*d-c*i*m+e*u*m)*w,t[6]=(f*o*s-r*_*s-f*i*l+e*_*l+r*i*m-e*o*m)*w,t[7]=(r*u*s-c*o*s+c*i*l-e*u*l-r*i*d+e*o*d)*w,t[8]=x*w,t[9]=(f*h*s-c*g*s-f*n*d+e*g*d+c*n*m-e*h*m)*w,t[10]=(r*g*s-f*a*s+f*n*l-e*g*l-r*n*m+e*a*m)*w,t[11]=(c*a*s-r*h*s-c*n*l+e*h*l+r*n*d-e*a*d)*w,t[12]=M*w,t[13]=(c*g*i-f*h*i+f*n*u-e*g*u-c*n*_+e*h*_)*w,t[14]=(f*a*i-r*g*i-f*n*o+e*g*o+r*n*_-e*a*_)*w,t[15]=(r*h*i-c*a*i+c*n*o-e*h*o-r*n*u+e*a*u)*w,this}scale(t){let e=this.elements,{x:n,y:i,z:s}=t;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){if(t.isVector3)this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1);else this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1);return this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,{x:r,y:a,z:o}=t,l=s*r,c=s*a;return this.set(l*r+n,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+n,c*o-i*r,0,l*o-i*a,c*o+i*r,s*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,{_x:s,_y:r,_z:a,_w:o}=e,l=s+s,c=r+r,h=a+a,u=s*l,d=s*c,f=s*h,g=r*c,_=r*h,m=a*h,p=o*l,v=o*c,x=o*h,{x:M,y:R,z:w}=n;return i[0]=(1-(g+m))*M,i[1]=(d+x)*M,i[2]=(f-v)*M,i[3]=0,i[4]=(d-x)*R,i[5]=(1-(u+m))*R,i[6]=(_+p)*R,i[7]=0,i[8]=(f+v)*w,i[9]=(_-p)*w,i[10]=(1-(u+g))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=rs.set(i[0],i[1],i[2]).length(),r=rs.set(i[4],i[5],i[6]).length(),a=rs.set(i[8],i[9],i[10]).length();if(this.determinant()<0)s=-s;t.x=i[12],t.y=i[13],t.z=i[14],gn.copy(this);let l=1/s,c=1/r,h=1/a;return gn.elements[0]*=l,gn.elements[1]*=l,gn.elements[2]*=l,gn.elements[4]*=c,gn.elements[5]*=c,gn.elements[6]*=c,gn.elements[8]*=h,gn.elements[9]*=h,gn.elements[10]*=h,e.setFromRotationMatrix(gn),n.x=s,n.y=r,n.z=a,this}makePerspective(t,e,n,i,s,r,a=2000,o=!1){let l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i),f,g;if(o)f=s/(r-s),g=r*s/(r-s);else if(a===2000)f=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(a===2001)f=-r/(r-s),g=-r*s/(r-s);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,r,a=2000,o=!1){let l=this.elements,c=2/(e-t),h=2/(n-i),u=-(e+t)/(e-t),d=-(n+i)/(n-i),f,g;if(o)f=1/(r-s),g=r/(r-s);else if(a===2000)f=-2/(r-s),g=-(r+s)/(r-s);else if(a===2001)f=-1/(r-s),g=-s/(r-s);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}var rs=new E,gn=new Bt,Rg=new E(0,0,0),Pg=new E(1,1,1),ti=new E,za=new E,je=new E,zd=new Bt,kd=new Ee;class Be{constructor(t=0,e=0,n=0,i=Be.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],r=i[4],a=i[8],o=i[1],l=i[5],c=i[9],h=i[2],u=i[6],d=i[10];switch(e){case"XYZ":if(this._y=Math.asin(Ot(a,-1,1)),Math.abs(a)<0.9999999)this._x=Math.atan2(-c,d),this._z=Math.atan2(-r,s);else this._x=Math.atan2(u,l),this._z=0;break;case"YXZ":if(this._x=Math.asin(-Ot(c,-1,1)),Math.abs(c)<0.9999999)this._y=Math.atan2(a,d),this._z=Math.atan2(o,l);else this._y=Math.atan2(-h,s),this._z=0;break;case"ZXY":if(this._x=Math.asin(Ot(u,-1,1)),Math.abs(u)<0.9999999)this._y=Math.atan2(-h,d),this._z=Math.atan2(-r,l);else this._y=0,this._z=Math.atan2(o,s);break;case"ZYX":if(this._y=Math.asin(-Ot(h,-1,1)),Math.abs(h)<0.9999999)this._x=Math.atan2(u,d),this._z=Math.atan2(o,s);else this._x=0,this._z=Math.atan2(-r,l);break;case"YZX":if(this._z=Math.asin(Ot(o,-1,1)),Math.abs(o)<0.9999999)this._x=Math.atan2(-c,l),this._y=Math.atan2(-h,s);else this._x=0,this._y=Math.atan2(a,d);break;case"XZY":if(this._z=Math.asin(-Ot(r,-1,1)),Math.abs(r)<0.9999999)this._x=Math.atan2(u,l),this._y=Math.atan2(a,s);else this._x=Math.atan2(-c,d),this._y=0;break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}if(this._order=e,n===!0)this._onChangeCallback();return this}setFromQuaternion(t,e,n){return zd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return kd.setFromEuler(this),this.setFromQuaternion(kd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){if(this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0)this._order=t[3];return this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Be.DEFAULT_ORDER="XYZ";class Os{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}var Ig=0,Hd=new E,as=new Ee,On=new Bt,ka=new E,rr=new E,Dg=new E,Lg=new Ee,Gd=new E(1,0,0),Vd=new E(0,1,0),Wd=new E(0,0,1),Xd={type:"added"},Ug={type:"removed"},os={type:"childadded",child:null},Ac={type:"childremoved",child:null};class ne extends un{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ne.DEFAULT_UP.clone();let t=new E,e=new Be,n=new Ee,i=new E(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Bt},normalMatrix:{value:new Vt}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.multiply(as),this}rotateOnWorldAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.premultiply(as),this}rotateX(t){return this.rotateOnAxis(Gd,t)}rotateY(t){return this.rotateOnAxis(Vd,t)}rotateZ(t){return this.rotateOnAxis(Wd,t)}translateOnAxis(t,e){return Hd.copy(t).applyQuaternion(this.quaternion),this.position.add(Hd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gd,t)}translateY(t){return this.translateOnAxis(Vd,t)}translateZ(t){return this.translateOnAxis(Wd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){if(t.isVector3)ka.copy(t);else ka.set(t,e,n);let i=this.parent;if(this.updateWorldMatrix(!0,!1),rr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)On.lookAt(rr,ka,this.up);else On.lookAt(ka,rr,this.up);if(this.quaternion.setFromRotationMatrix(On),i)On.extractRotation(i.matrixWorld),as.setFromRotationMatrix(On),this.quaternion.premultiply(as.invert())}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}if(t===this)return console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this;if(t&&t.isObject3D)t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xd),os.child=t,this.dispatchEvent(os),os.child=null;else console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t);return this}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);if(e!==-1)t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ug),Ac.child=t,this.dispatchEvent(Ac),Ac.child=null;return this}removeFromParent(){let t=this.parent;if(t!==null)t.remove(this);return this}clear(){return this.remove(...this.children)}attach(t){if(this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null)t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld);return t.applyMatrix4(On),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xd),os.child=t,this.dispatchEvent(os),os.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}return}getObjectsByProperty(t,e,n=[]){if(this[t]===e)n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,t,Dg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(rr,Lg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;if(e!==null)t(e),e.traverseAncestors(t)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||t){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,t=!0}let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null)n.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);if(e===!0){let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t==="string",n={};if(e)t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let i={};if(i.uuid=this.uuid,i.type=this.type,this.name!=="")i.name=this.name;if(this.castShadow===!0)i.castShadow=!0;if(this.receiveShadow===!0)i.receiveShadow=!0;if(this.visible===!1)i.visible=!1;if(this.frustumCulled===!1)i.frustumCulled=!1;if(this.renderOrder!==0)i.renderOrder=this.renderOrder;if(Object.keys(this.userData).length>0)i.userData=this.userData;if(i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1)i.matrixAutoUpdate=!1;if(this.isInstancedMesh){if(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)i.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map((a)=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map((a)=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null)i.colorsTexture=this._colorsTexture.toJSON(t);if(this.boundingSphere!==null)i.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)i.boundingBox=this.boundingBox.toJSON()}function s(a,o){if(a[o.uuid]===void 0)a[o.uuid]=o.toJSON(t);return o.uuid}if(this.isScene){if(this.background){if(this.background.isColor)i.background=this.background.toJSON();else if(this.background.isTexture)i.background=this.background.toJSON(t).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)i.environment=this.environment.toJSON(t).uuid}else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){let h=o[l];s(t.shapes,h)}else s(t.shapes,o)}}if(this.isSkinnedMesh){if(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(s(t.materials,this.material[o]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(s(t.animations,o))}}if(e){let a=r(t.geometries),o=r(t.materials),l=r(t.textures),c=r(t.images),h=r(t.shapes),u=r(t.skeletons),d=r(t.animations),f=r(t.nodes);if(a.length>0)n.geometries=a;if(o.length>0)n.materials=o;if(l.length>0)n.textures=l;if(c.length>0)n.images=c;if(h.length>0)n.shapes=h;if(u.length>0)n.skeletons=u;if(d.length>0)n.animations=d;if(f.length>0)n.nodes=f}return n.object=i,n;function r(a){let o=[];for(let l in a){let c=a[l];delete c.metadata,o.push(c)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}}ne.DEFAULT_UP=new E(0,1,0);ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _n=new E,Bn=new E,Cc=new E,zn=new E,ls=new E,cs=new E,qd=new E,Rc=new E,Pc=new E,Ic=new E,Dc=new ee,Lc=new ee,Uc=new ee;class We{constructor(t=new E,e=new E,n=new E){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),_n.subVectors(t,e),i.cross(_n);let s=i.lengthSq();if(s>0)return i.multiplyScalar(1/Math.sqrt(s));return i.set(0,0,0)}static getBarycoord(t,e,n,i,s){_n.subVectors(i,e),Bn.subVectors(n,e),Cc.subVectors(t,e);let r=_n.dot(_n),a=_n.dot(Bn),o=_n.dot(Cc),l=Bn.dot(Bn),c=Bn.dot(Cc),h=r*l-a*a;if(h===0)return s.set(0,0,0),null;let u=1/h,d=(l*o-a*c)*u,f=(r*c-a*o)*u;return s.set(1-d-f,f,d)}static containsPoint(t,e,n,i){if(this.getBarycoord(t,e,n,i,zn)===null)return!1;return zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,n,i,s,r,a,o){if(this.getBarycoord(t,e,n,i,zn)===null){if(o.x=0,o.y=0,"z"in o)o.z=0;if("w"in o)o.w=0;return null}return o.setScalar(0),o.addScaledVector(s,zn.x),o.addScaledVector(r,zn.y),o.addScaledVector(a,zn.z),o}static getInterpolatedAttribute(t,e,n,i,s,r){return Dc.setScalar(0),Lc.setScalar(0),Uc.setScalar(0),Dc.fromBufferAttribute(t,e),Lc.fromBufferAttribute(t,n),Uc.fromBufferAttribute(t,i),r.setScalar(0),r.addScaledVector(Dc,s.x),r.addScaledVector(Lc,s.y),r.addScaledVector(Uc,s.z),r}static isFrontFacing(t,e,n,i){return _n.subVectors(n,e),Bn.subVectors(t,e),_n.cross(Bn).dot(i)<0?!0:!1}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return _n.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),_n.cross(Bn).length()*0.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(t){return We.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return We.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return We.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return We.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return We.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,r,a;ls.subVectors(i,n),cs.subVectors(s,n),Rc.subVectors(t,n);let o=ls.dot(Rc),l=cs.dot(Rc);if(o<=0&&l<=0)return e.copy(n);Pc.subVectors(t,i);let c=ls.dot(Pc),h=cs.dot(Pc);if(c>=0&&h<=c)return e.copy(i);let u=o*h-c*l;if(u<=0&&o>=0&&c<=0)return r=o/(o-c),e.copy(n).addScaledVector(ls,r);Ic.subVectors(t,s);let d=ls.dot(Ic),f=cs.dot(Ic);if(f>=0&&d<=f)return e.copy(s);let g=d*l-o*f;if(g<=0&&l>=0&&f<=0)return a=l/(l-f),e.copy(n).addScaledVector(cs,a);let _=c*f-d*h;if(_<=0&&h-c>=0&&d-f>=0)return qd.subVectors(s,i),a=(h-c)/(h-c+(d-f)),e.copy(i).addScaledVector(qd,a);let m=1/(_+g+u);return r=g*m,a=u*m,e.copy(n).addScaledVector(ls,r).addScaledVector(cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}var qp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function Nc(t,e,n){if(n<0)n+=1;if(n>1)n-=1;if(n<0.16666666666666666)return t+(e-t)*6*n;if(n<0.5)return e;if(n<0.6666666666666666)return t+(e-t)*6*(0.6666666666666666-n);return t}class dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;if(i&&i.isColor)this.copy(i);else if(typeof i==="number")this.setHex(i);else if(typeof i==="string")this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e="srgb"){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Kt.workingColorSpace){if(t=iu(t,1),e=Ot(e,0,1),n=Ot(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=0.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Nc(r,s,t+0.3333333333333333),this.g=Nc(r,s,t),this.b=Nc(r,s,t-0.3333333333333333)}return Kt.colorSpaceToWorking(this,i),this}setStyle(t,e="srgb"){function n(s){if(s===void 0)return;if(parseFloat(s)<1)console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);else if(r===6)return this.setHex(parseInt(s,16),e);else console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e="srgb"){let n=qp[t.toLowerCase()];if(n!==void 0)this.setHex(n,e);else console.warn("THREE.Color: Unknown color "+t);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gn(t.r),this.g=Gn(t.g),this.b=Gn(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t="srgb"){return Kt.workingToColorSpace(Fe.copy(this),t),Math.round(Ot(Fe.r*255,0,255))*65536+Math.round(Ot(Fe.g*255,0,255))*256+Math.round(Ot(Fe.b*255,0,255))}getHexString(t="srgb"){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Fe.copy(this),e);let{r:n,g:i,b:s}=Fe,r=Math.max(n,i,s),a=Math.min(n,i,s),o,l,c=(a+r)/2;if(a===r)o=0,l=0;else{let h=r-a;switch(l=c<=0.5?h/(r+a):h/(2-r-a),r){case n:o=(i-s)/h+(i<s?6:0);break;case i:o=(s-n)/h+2;break;case s:o=(n-i)/h+4;break}o/=6}return t.h=o,t.s=l,t.l=c,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t="srgb"){Kt.workingToColorSpace(Fe.copy(this),t);let{r:e,g:n,b:i}=Fe;if(t!=="srgb")return`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`;return`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(Ha);let n=_r(ei.h,Ha.h,e),i=_r(ei.s,Ha.s,e),s=_r(ei.l,Ha.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var Fe=new dt;dt.NAMES=qp;var Ng=0;class Le extends un{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ng++}),this.uuid=en(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){if(this._alphaTest>0!==t>0)this.version++;this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t===void 0)return;for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}if(i&&i.isColor)i.set(n);else if(i&&i.isVector3&&(n&&n.isVector3))i.copy(n);else this[e]=n}}toJSON(t){let e=t===void 0||typeof t==="string";if(e)t={textures:{},images:{}};let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(n.uuid=this.uuid,n.type=this.type,this.name!=="")n.name=this.name;if(this.color&&this.color.isColor)n.color=this.color.getHex();if(this.roughness!==void 0)n.roughness=this.roughness;if(this.metalness!==void 0)n.metalness=this.metalness;if(this.sheen!==void 0)n.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)n.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)n.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)n.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)n.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)n.specular=this.specular.getHex();if(this.specularIntensity!==void 0)n.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)n.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)n.shininess=this.shininess;if(this.clearcoat!==void 0)n.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)n.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid;if(this.dispersion!==void 0)n.dispersion=this.dispersion;if(this.iridescence!==void 0)n.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)n.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)n.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid;if(this.anisotropy!==void 0)n.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)n.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid;if(this.map&&this.map.isTexture)n.map=this.map.toJSON(t).uuid;if(this.matcap&&this.matcap.isTexture)n.matcap=this.matcap.toJSON(t).uuid;if(this.alphaMap&&this.alphaMap.isTexture)n.alphaMap=this.alphaMap.toJSON(t).uuid;if(this.lightMap&&this.lightMap.isTexture)n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)n.roughnessMap=this.roughnessMap.toJSON(t).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)n.metalnessMap=this.metalnessMap.toJSON(t).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)n.emissiveMap=this.emissiveMap.toJSON(t).uuid;if(this.specularMap&&this.specularMap.isTexture)n.specularMap=this.specularMap.toJSON(t).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)n.specularColorMap=this.specularColorMap.toJSON(t).uuid;if(this.envMap&&this.envMap.isTexture){if(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0)n.combine=this.combine}if(this.envMapRotation!==void 0)n.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)n.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)n.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)n.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)n.gradientMap=this.gradientMap.toJSON(t).uuid;if(this.transmission!==void 0)n.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)n.transmissionMap=this.transmissionMap.toJSON(t).uuid;if(this.thickness!==void 0)n.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)n.thicknessMap=this.thicknessMap.toJSON(t).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)n.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)n.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)n.size=this.size;if(this.shadowSide!==null)n.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)n.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)n.blending=this.blending;if(this.side!==0)n.side=this.side;if(this.vertexColors===!0)n.vertexColors=!0;if(this.opacity<1)n.opacity=this.opacity;if(this.transparent===!0)n.transparent=!0;if(this.blendSrc!==204)n.blendSrc=this.blendSrc;if(this.blendDst!==205)n.blendDst=this.blendDst;if(this.blendEquation!==100)n.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)n.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)n.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)n.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)n.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)n.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)n.depthFunc=this.depthFunc;if(this.depthTest===!1)n.depthTest=this.depthTest;if(this.depthWrite===!1)n.depthWrite=this.depthWrite;if(this.colorWrite===!1)n.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)n.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)n.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)n.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)n.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)n.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)n.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)n.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)n.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)n.rotation=this.rotation;if(this.polygonOffset===!0)n.polygonOffset=!0;if(this.polygonOffsetFactor!==0)n.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)n.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)n.linewidth=this.linewidth;if(this.dashSize!==void 0)n.dashSize=this.dashSize;if(this.gapSize!==void 0)n.gapSize=this.gapSize;if(this.scale!==void 0)n.scale=this.scale;if(this.dithering===!0)n.dithering=!0;if(this.alphaTest>0)n.alphaTest=this.alphaTest;if(this.alphaHash===!0)n.alphaHash=!0;if(this.alphaToCoverage===!0)n.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)n.premultipliedAlpha=!0;if(this.forceSinglePass===!0)n.forceSinglePass=!0;if(this.wireframe===!0)n.wireframe=!0;if(this.wireframeLinewidth>1)n.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")n.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")n.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)n.flatShading=!0;if(this.visible===!1)n.visible=!1;if(this.toneMapped===!1)n.toneMapped=!1;if(this.fog===!1)n.fog=!1;if(Object.keys(this.userData).length>0)n.userData=this.userData;function i(s){let r=[];for(let a in s){let o=s[a];delete o.metadata,r.push(o)}return r}if(e){let s=i(t.textures),r=i(t.images);if(s.length>0)n.textures=s;if(r.length>0)n.images=r}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){if(t===!0)this.version++}}class dn extends Le{constructor(t){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}var Hn=Fg();function Fg(){let t=new ArrayBuffer(4),e=new Float32Array(t),n=new Uint32Array(t),i=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;if(c<-27)i[l]=0,i[l|256]=32768,s[l]=24,s[l|256]=24;else if(c<-14)i[l]=1024>>-c-14,i[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1;else if(c<=15)i[l]=c+15<<10,i[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13;else if(c<128)i[l]=31744,i[l|256]=64512,s[l]=24,s[l|256]=24;else i[l]=31744,i[l|256]=64512,s[l]=13,s[l|256]=13}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;while((c&8388608)===0)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)if(l!==32)o[l]=1024;return{floatView:e,uint32View:n,baseTable:i,shiftTable:s,mantissaTable:r,exponentTable:a,offsetTable:o}}function Ye(t){if(Math.abs(t)>65504)console.warn("THREE.DataUtils.toHalfFloat(): Value out of range.");t=Ot(t,-65504,65504),Hn.floatView[0]=t;let e=Hn.uint32View[0],n=e>>23&511;return Hn.baseTable[n]+((e&8388607)>>Hn.shiftTable[n])}function mr(t){let e=t>>10;return Hn.uint32View[0]=Hn.mantissaTable[Hn.offsetTable[e]+(t&1023)]+Hn.exponentTable[e],Hn.floatView[0]}class lu{static toHalfFloat(t){return Ye(t)}static fromHalfFloat(t){return mr(t)}}var be=new E,Ga=new H,Og=0;class se{constructor(t,e,n=!1){if(Array.isArray(t))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Og++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(t){if(t===!0)this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ga.fromBufferAttribute(this,e),Ga.applyMatrix3(t),this.setXY(e,Ga.x,Ga.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix3(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyMatrix4(t),this.setXYZ(e,be.x,be.y,be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.applyNormalMatrix(t),this.setXYZ(e,be.x,be.y,be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)be.fromBufferAttribute(this,e),be.transformDirection(t),this.setXYZ(e,be.x,be.y,be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];if(this.normalized)n=Ve(n,this.array);return n}setComponent(t,e,n){if(this.normalized)n=Yt(n,this.array);return this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];if(this.normalized)e=Ve(e,this.array);return e}setX(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];if(this.normalized)e=Ve(e,this.array);return e}setY(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];if(this.normalized)e=Ve(e,this.array);return e}setZ(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];if(this.normalized)e=Ve(e,this.array);return e}setW(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array);return this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array);return this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array);return this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")t.name=this.name;if(this.usage!==35044)t.usage=this.usage;return t}}class cu extends se{constructor(t,e,n){super(new Int8Array(t),e,n)}}class hu extends se{constructor(t,e,n){super(new Uint8Array(t),e,n)}}class uu extends se{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}}class du extends se{constructor(t,e,n){super(new Int16Array(t),e,n)}}class Yr extends se{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class fu extends se{constructor(t,e,n){super(new Int32Array(t),e,n)}}class Zr extends se{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class pu extends se{constructor(t,e,n){super(new Uint16Array(t),e,n);this.isFloat16BufferAttribute=!0}getX(t){let e=mr(this.array[t*this.itemSize]);if(this.normalized)e=Ve(e,this.array);return e}setX(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize]=Ye(e),this}getY(t){let e=mr(this.array[t*this.itemSize+1]);if(this.normalized)e=Ve(e,this.array);return e}setY(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+1]=Ye(e),this}getZ(t){let e=mr(this.array[t*this.itemSize+2]);if(this.normalized)e=Ve(e,this.array);return e}setZ(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+2]=Ye(e),this}getW(t){let e=mr(this.array[t*this.itemSize+3]);if(this.normalized)e=Ve(e,this.array);return e}setW(t,e){if(this.normalized)e=Yt(e,this.array);return this.array[t*this.itemSize+3]=Ye(e),this}setXY(t,e,n){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array);return this.array[t+0]=Ye(e),this.array[t+1]=Ye(n),this}setXYZ(t,e,n,i){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array);return this.array[t+0]=Ye(e),this.array[t+1]=Ye(n),this.array[t+2]=Ye(i),this}setXYZW(t,e,n,i,s){if(t*=this.itemSize,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array);return this.array[t+0]=Ye(e),this.array[t+1]=Ye(n),this.array[t+2]=Ye(i),this.array[t+3]=Ye(s),this}}class Mt extends se{constructor(t,e,n){super(new Float32Array(t),e,n)}}var Bg=0,an=new Bt,Fc=new ne,hs=new E,tn=new Ie,ar=new Ie,Pe=new E;class Ht extends un{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){if(Array.isArray(t))this.index=new((su(t))?Zr:Yr)(t,1);else this.index=t;return this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;if(e!==void 0)e.applyMatrix4(t),e.needsUpdate=!0;let n=this.attributes.normal;if(n!==void 0){let s=new Vt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;if(i!==void 0)i.transformDirection(t),i.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return Fc.lookAt(t),Fc.updateMatrix(),this.applyMatrix4(Fc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Mt(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}if(t.length>e.count)console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");e.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Ie;let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];if(tn.setFromBufferAttribute(s),this.morphTargetsRelative)Pe.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Pe);else this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new we;let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(t){let n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){let a=e[s];if(ar.setFromBufferAttribute(a),this.morphTargetsRelative)Pe.addVectors(tn.min,ar.min),tn.expandByPoint(Pe),Pe.addVectors(tn.max,ar.max),tn.expandByPoint(Pe);else tn.expandByPoint(ar.min),tn.expandByPoint(ar.max)}tn.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)Pe.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Pe));if(e)for(let s=0,r=e.length;s<r;s++){let a=e[s],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++){if(Pe.fromBufferAttribute(a,l),o)hs.fromBufferAttribute(t,l),Pe.add(hs);i=Math.max(i,n.distanceToSquared(Pe))}}if(this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius))console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:n,normal:i,uv:s}=e;if(this.hasAttribute("tangent")===!1)this.setAttribute("tangent",new se(new Float32Array(4*n.count),4));let r=this.getAttribute("tangent"),a=[],o=[];for(let A=0;A<n.count;A++)a[A]=new E,o[A]=new E;let l=new E,c=new E,h=new E,u=new H,d=new H,f=new H,g=new E,_=new E;function m(A,L,S){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(s,A),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,S),c.sub(l),h.sub(l),d.sub(u),f.sub(u);let T=1/(d.x*f.y-f.x*d.y);if(!isFinite(T))return;g.copy(c).multiplyScalar(f.y).addScaledVector(h,-d.y).multiplyScalar(T),_.copy(h).multiplyScalar(d.x).addScaledVector(c,-f.x).multiplyScalar(T),a[A].add(g),a[L].add(g),a[S].add(g),o[A].add(_),o[L].add(_),o[S].add(_)}let p=this.groups;if(p.length===0)p=[{start:0,count:t.count}];for(let A=0,L=p.length;A<L;++A){let S=p[A],{start:T,count:I}=S;for(let k=T,V=T+I;k<V;k+=3)m(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let v=new E,x=new E,M=new E,R=new E;function w(A){M.fromBufferAttribute(i,A),R.copy(M);let L=a[A];v.copy(L),v.sub(M.multiplyScalar(M.dot(L))).normalize(),x.crossVectors(R,L);let T=x.dot(o[A])<0?-1:1;r.setXYZW(A,v.x,v.y,v.z,T)}for(let A=0,L=p.length;A<L;++A){let S=p[A],{start:T,count:I}=S;for(let k=T,V=T+I;k<V;k+=3)w(t.getX(k+0)),w(t.getX(k+1)),w(t.getX(k+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new se(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,d=n.count;u<d;u++)n.setXYZ(u,0,0,0);let i=new E,s=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E;if(t)for(let u=0,d=t.count;u<d;u+=3){let f=t.getX(u+0),g=t.getX(u+1),_=t.getX(u+2);i.fromBufferAttribute(e,f),s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),a.fromBufferAttribute(n,f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),a.add(c),o.add(c),l.add(c),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let u=0,d=e.count;u<d;u+=3)i.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),c.subVectors(r,s),h.subVectors(i,s),c.cross(h),n.setXYZ(u+0,c.x,c.y,c.z),n.setXYZ(u+1,c.x,c.y,c.z),n.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,o){let{array:l,itemSize:c,normalized:h}=a,u=new l.constructor(o.length*c),d=0,f=0;for(let g=0,_=o.length;g<_;g++){if(a.isInterleavedBufferAttribute)d=o[g]*a.data.stride+a.offset;else d=o[g]*c;for(let m=0;m<c;m++)u[f++]=l[d++]}return new se(u,c,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new Ht,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],l=t(o,n);e.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let o=[],l=s[a];for(let c=0,h=l.length;c<h;c++){let u=l[c],d=t(u,n);o.push(d)}e.morphAttributes[a]=o}e.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let a=0,o=r.length;a<o;a++){let l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!=="")t.name=this.name;if(Object.keys(this.userData).length>0)t.userData=this.userData;if(this.parameters!==void 0){let o=this.parameters;for(let l in o)if(o[l]!==void 0)t[l]=o[l];return t}t.data={attributes:{}};let e=this.index;if(e!==null)t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)};let n=this.attributes;for(let o in n){let l=n[o];t.data.attributes[o]=l.toJSON(t.data)}let i={},s=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],c=[];for(let h=0,u=l.length;h<u;h++){let d=l[h];c.push(d.toJSON(t.data))}if(c.length>0)i[o]=c,s=!0}if(s)t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;if(r.length>0)t.data.groups=JSON.parse(JSON.stringify(r));let a=this.boundingSphere;if(a!==null)t.data.boundingSphere=a.toJSON();return t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;if(n!==null)this.setIndex(n.clone());let i=t.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(e))}let s=t.morphAttributes;for(let l in s){let c=[],h=s[l];for(let u=0,d=h.length;u<d;u++)c.push(h[u].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let l=0,c=r.length;l<c;l++){let h=r[l];this.addGroup(h.start,h.count,h.materialIndex)}let a=t.boundingBox;if(a!==null)this.boundingBox=a.clone();let o=t.boundingSphere;if(o!==null)this.boundingSphere=o.clone();return this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}var Yd=new Bt,_i=new Dn,Va=new we,Zd=new E,Wa=new E,Xa=new E,qa=new E,Oc=new E,Ya=new E,Jd=new E,Za=new E;class pe extends ne{constructor(t=new Ht,e=new dn){super();this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){if(super.copy(t,e),t.morphTargetInfluences!==void 0)this.morphTargetInfluences=t.morphTargetInfluences.slice();if(t.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary);return this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(s&&a){Ya.set(0,0,0);for(let o=0,l=s.length;o<l;o++){let c=a[o],h=s[o];if(c===0)continue;if(Oc.fromBufferAttribute(h,t),r)Ya.addScaledVector(Oc,c);else Ya.addScaledVector(Oc.sub(e),c)}e.add(Ya)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i===void 0)return;if(n.boundingSphere===null)n.computeBoundingSphere();if(Va.copy(n.boundingSphere),Va.applyMatrix4(s),_i.copy(t.ray).recast(t.near),Va.containsPoint(_i.origin)===!1){if(_i.intersectSphere(Va,Zd)===null)return;if(_i.origin.distanceToSquared(Zd)>(t.far-t.near)**2)return}if(Yd.copy(s).invert(),_i.copy(t.ray).applyMatrix4(Yd),n.boundingBox!==null){if(_i.intersectsBox(n.boundingBox)===!1)return}this._computeIntersections(t,e,_i)}_computeIntersections(t,e,n){let i,s=this.geometry,r=this.material,a=s.index,o=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,h=s.attributes.normal,{groups:u,drawRange:d}=s;if(a!==null)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],m=r[_.materialIndex],p=Math.max(_.start,d.start),v=Math.min(a.count,Math.min(_.start+_.count,d.start+d.count));for(let x=p,M=v;x<M;x+=3){let R=a.getX(x),w=a.getX(x+1),A=a.getX(x+2);if(i=Ja(this,m,t,n,l,c,h,R,w,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,e.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(a.count,d.start+d.count);for(let _=f,m=g;_<m;_+=3){let p=a.getX(_),v=a.getX(_+1),x=a.getX(_+2);if(i=Ja(this,r,t,n,l,c,h,p,v,x),i)i.faceIndex=Math.floor(_/3),e.push(i)}}else if(o!==void 0)if(Array.isArray(r))for(let f=0,g=u.length;f<g;f++){let _=u[f],m=r[_.materialIndex],p=Math.max(_.start,d.start),v=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let x=p,M=v;x<M;x+=3){let R=x,w=x+1,A=x+2;if(i=Ja(this,m,t,n,l,c,h,R,w,A),i)i.faceIndex=Math.floor(x/3),i.face.materialIndex=_.materialIndex,e.push(i)}}else{let f=Math.max(0,d.start),g=Math.min(o.count,d.start+d.count);for(let _=f,m=g;_<m;_+=3){let p=_,v=_+1,x=_+2;if(i=Ja(this,r,t,n,l,c,h,p,v,x),i)i.faceIndex=Math.floor(_/3),e.push(i)}}}}function zg(t,e,n,i,s,r,a,o){let l;if(e.side===1)l=i.intersectTriangle(a,r,s,!0,o);else l=i.intersectTriangle(s,r,a,e.side===0,o);if(l===null)return null;Za.copy(o),Za.applyMatrix4(t.matrixWorld);let c=n.ray.origin.distanceTo(Za);if(c<n.near||c>n.far)return null;return{distance:c,point:Za.clone(),object:t}}function Ja(t,e,n,i,s,r,a,o,l,c){t.getVertexPosition(o,Wa),t.getVertexPosition(l,Xa),t.getVertexPosition(c,qa);let h=zg(t,e,n,i,Wa,Xa,qa,Jd);if(h){let u=new E;if(We.getBarycoord(Jd,Wa,Xa,qa,u),s)h.uv=We.getInterpolatedAttribute(s,o,l,c,u,new H);if(r)h.uv1=We.getInterpolatedAttribute(r,o,l,c,u,new H);if(a){if(h.normal=We.getInterpolatedAttribute(a,o,l,c,u,new E),h.normal.dot(i.direction)>0)h.normal.multiplyScalar(-1)}let d={a:o,b:l,c,normal:new E,materialIndex:0};We.getNormal(Wa,Xa,qa,d.normal),h.face=d,h.barycoord=u}return h}class hi extends Ht{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super();this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let o=[],l=[],c=[],h=[],u=0,d=0;f("z","y","x",-1,-1,n,e,t,r,s,0),f("z","y","x",1,-1,n,e,-t,r,s,1),f("x","z","y",1,1,t,n,e,i,r,2),f("x","z","y",1,-1,t,n,-e,i,r,3),f("x","y","z",1,-1,t,e,n,i,s,4),f("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(o),this.setAttribute("position",new Mt(l,3)),this.setAttribute("normal",new Mt(c,3)),this.setAttribute("uv",new Mt(h,2));function f(g,_,m,p,v,x,M,R,w,A,L){let S=x/w,T=M/A,I=x/2,k=M/2,V=R/2,B=w+1,K=A+1,W=0,nt=0,G=new E;for(let ft=0;ft<K;ft++){let pt=ft*T-k;for(let Dt=0;Dt<B;Dt++){let Wt=Dt*S-I;G[g]=Wt*p,G[_]=pt*v,G[m]=V,l.push(G.x,G.y,G.z),G[g]=0,G[_]=0,G[m]=R>0?1:-1,c.push(G.x,G.y,G.z),h.push(Dt/w),h.push(1-ft/A),W+=1}}for(let ft=0;ft<A;ft++)for(let pt=0;pt<w;pt++){let Dt=u+pt+B*ft,Wt=u+pt+B*(ft+1),de=u+(pt+1)+B*(ft+1),jt=u+(pt+1)+B*ft;o.push(Dt,Wt,jt),o.push(Wt,de,jt),nt+=6}a.addGroup(d,nt,L),d+=nt,u+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Gi(t){let e={};for(let n in t){e[n]={};for(let i in t[n]){let s=t[n][i];if(s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion))if(s.isRenderTargetTexture)console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null;else e[n][i]=s.clone();else if(Array.isArray(s))e[n][i]=s.slice();else e[n][i]=s}}return e}function ze(t){let e={};for(let n=0;n<t.length;n++){let i=Gi(t[n]);for(let s in i)e[s]=i[s]}return e}function kg(t){let e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function mu(t){let e=t.getRenderTarget();if(e===null)return t.outputColorSpace;if(e.isXRRenderTarget===!0)return e.texture.colorSpace;return Kt.workingColorSpace}var Ln={clone:Gi,merge:ze},Hg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Se extends Le{constructor(t){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hg,this.fragmentShader=Gg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0)this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gi(t.uniforms),this.uniformsGroups=kg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let r=this.uniforms[i].value;if(r&&r.isTexture)e.uniforms[i]={type:"t",value:r.toJSON(t).uuid};else if(r&&r.isColor)e.uniforms[i]={type:"c",value:r.getHex()};else if(r&&r.isVector2)e.uniforms[i]={type:"v2",value:r.toArray()};else if(r&&r.isVector3)e.uniforms[i]={type:"v3",value:r.toArray()};else if(r&&r.isVector4)e.uniforms[i]={type:"v4",value:r.toArray()};else if(r&&r.isMatrix3)e.uniforms[i]={type:"m3",value:r.toArray()};else if(r&&r.isMatrix4)e.uniforms[i]={type:"m4",value:r.toArray()};else e.uniforms[i]={value:r}}if(Object.keys(this.defines).length>0)e.defines=this.defines;e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)if(this.extensions[i]===!0)n[i]=!0;if(Object.keys(n).length>0)e.extensions=n;return e}}class Bs extends ne{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}var ni=new E,$d=new H,Kd=new H;class Te extends Bs{constructor(t=50,e=1,n=0.1,i=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=0.5*this.getFilmHeight()/t;this.fov=Ri*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ci*0.5*this.fov);return 0.5*this.getFilmHeight()/t}getEffectiveFOV(){return Ri*2*Math.atan(Math.tan(Ci*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ni.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),n.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,$d,Kd),e.subVectors(Kd,$d)}setViewOffset(t,e,n,i,s,r){if(this.aspect=t/e,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ci*0.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-0.5*i,r=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:o,fullHeight:l}=r;s+=r.offsetX*i/o,e-=r.offsetY*n/l,i*=r.width/o,n*=r.height/l}let a=this.filmOffset;if(a!==0)s+=t*a/this.getFilmWidth();this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);if(e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null)e.object.view=Object.assign({},this.view);return e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}var us=-90,ds=1;class gl extends ne{constructor(t,e,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Te(us,ds,t,e);i.layers=this.layers,this.add(i);let s=new Te(us,ds,t,e);s.layers=this.layers,this.add(s);let r=new Te(us,ds,t,e);r.layers=this.layers,this.add(r);let a=new Te(us,ds,t,e);a.layers=this.layers,this.add(a);let o=new Te(us,ds,t,e);o.layers=this.layers,this.add(o);let l=new Te(us,ds,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,s,r,a,o]=e;for(let l of e)this.remove(l);if(t===2000)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;if(this.coordinateSystem!==t.coordinateSystem)this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem();let[s,r,a,o,l,c]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),f=t.xr.enabled;t.xr.enabled=!1;let g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,o),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=g,t.setRenderTarget(n,5,i),t.render(e,c),t.setRenderTarget(h,u,d),t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Vi extends xe{constructor(t=[],e=301,n,i,s,r,a,o,l,c){super(t,e,n,i,s,r,a,o,l,c);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _l extends De{constructor(t=1,e={}){super(t,t,e);this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Vi(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new hi(5,5,5),s=new Se({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=e;let r=new pe(i,s),a=e.minFilter;if(e.minFilter===1008)e.minFilter=1006;return new gl(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(s)}}class si extends ne{constructor(){super();this.isGroup=!0,this.type="Group"}}var Vg={type:"move"};class zs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new si,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new si,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new si,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E;return this._grip}dispatchEvent(t){if(this._targetRay!==null)this._targetRay.dispatchEvent(t);if(this._grip!==null)this._grip.dispatchEvent(t);if(this._hand!==null)this._hand.dispatchEvent(t);return this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){if(this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(t,e,n){let i=null,s=null,r=null,a=this._targetRay,o=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(let g of t.hand.values()){let _=e.getJointPose(g,n),m=this._getHandJoint(l,g);if(_!==null)m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius;m.visible=_!==null}let c=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],u=c.position.distanceTo(h.position),d=0.02,f=0.005;if(l.inputState.pinching&&u>d+f)l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this});else if(!l.inputState.pinching&&u<=d-f)l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this})}else if(o!==null&&t.gripSpace){if(s=e.getPose(t.gripSpace,n),s!==null){if(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity)o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity);else o.hasLinearVelocity=!1;if(s.angularVelocity)o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity);else o.hasAngularVelocity=!1}}if(a!==null){if(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null)i=s;if(i!==null){if(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity)a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity);else a.hasLinearVelocity=!1;if(i.angularVelocity)a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity);else a.hasAngularVelocity=!1;this.dispatchEvent(Vg)}}}if(a!==null)a.visible=i!==null;if(o!==null)o.visible=s!==null;if(l!==null)l.visible=r!==null;return this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new si;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Jr{constructor(t,e=0.00025){this.isFogExp2=!0,this.name="",this.color=new dt(t),this.density=e}clone(){return new Jr(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $r{constructor(t,e=1,n=1000){this.isFog=!0,this.name="",this.color=new dt(t),this.near=e,this.far=n}clone(){return new $r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class xl extends ne{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Be,this.environmentIntensity=1,this.environmentRotation=new Be,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){if(super.copy(t,e),t.background!==null)this.background=t.background.clone();if(t.environment!==null)this.environment=t.environment.clone();if(t.fog!==null)this.fog=t.fog.clone();if(this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null)this.overrideMaterial=t.overrideMaterial.clone();return this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);if(this.fog!==null)e.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)e.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)e.object.backgroundIntensity=this.backgroundIntensity;if(e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)e.object.environmentIntensity=this.environmentIntensity;return e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ks{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=35044,this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(t){if(t===!0)this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){if(t.arrayBuffers===void 0)t.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=en();if(t.arrayBuffers[this.array.buffer._uuid]===void 0)t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer;let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){if(t.arrayBuffers===void 0)t.arrayBuffers={};if(this.array.buffer._uuid===void 0)this.array.buffer._uuid=en();if(t.arrayBuffers[this.array.buffer._uuid]===void 0)t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer));return{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}var Ge=new E;class ri{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyMatrix4(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.applyNormalMatrix(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ge.fromBufferAttribute(this,e),Ge.transformDirection(t),this.setXYZ(e,Ge.x,Ge.y,Ge.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];if(this.normalized)n=Ve(n,this.array);return n}setComponent(t,e,n){if(this.normalized)n=Yt(n,this.array);return this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){if(this.normalized)e=Yt(e,this.array);return this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){if(this.normalized)e=Yt(e,this.array);return this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){if(this.normalized)e=Yt(e,this.array);return this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){if(this.normalized)e=Yt(e,this.array);return this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];if(this.normalized)e=Ve(e,this.array);return e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];if(this.normalized)e=Ve(e,this.array);return e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];if(this.normalized)e=Ve(e,this.array);return e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];if(this.normalized)e=Ve(e,this.array);return e}setXY(t,e,n){if(t=t*this.data.stride+this.offset,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){if(t=t*this.data.stride+this.offset,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){if(t=t*this.data.stride+this.offset,this.normalized)e=Yt(e,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array);return this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new se(new this.array.constructor(e),this.itemSize,this.normalized)}else{if(t.interleavedBuffers===void 0)t.interleavedBuffers={};if(t.interleavedBuffers[this.data.uuid]===void 0)t.interleavedBuffers[this.data.uuid]=this.data.clone(t);return new ri(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else{if(t.interleavedBuffers===void 0)t.interleavedBuffers={};if(t.interleavedBuffers[this.data.uuid]===void 0)t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t);return{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}}class Kr extends Le{constructor(t){super();this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}var fs,or=new E,ps=new E,ms=new E,gs=new H,lr=new H,Yp=new Bt,$a=new E,cr=new E,Ka=new E,Qd=new H,Bc=new H,jd=new H;class vl extends ne{constructor(t=new Kr){super();if(this.isSprite=!0,this.type="Sprite",fs===void 0){fs=new Ht;let e=new Float32Array([-0.5,-0.5,0,0,0,0.5,-0.5,0,1,0,0.5,0.5,0,1,1,-0.5,0.5,0,0,1]),n=new ks(e,5);fs.setIndex([0,1,2,0,2,3]),fs.setAttribute("position",new ri(n,3,0,!1)),fs.setAttribute("uv",new ri(n,2,3,!1))}this.geometry=fs,this.material=t,this.center=new H(0.5,0.5),this.count=1}raycast(t,e){if(t.camera===null)console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.');if(ps.setFromMatrixScale(this.matrixWorld),Yp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ms.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1)ps.multiplyScalar(-ms.z);let n=this.material.rotation,i,s;if(n!==0)s=Math.cos(n),i=Math.sin(n);let r=this.center;Qa($a.set(-0.5,-0.5,0),ms,r,ps,i,s),Qa(cr.set(0.5,-0.5,0),ms,r,ps,i,s),Qa(Ka.set(0.5,0.5,0),ms,r,ps,i,s),Qd.set(0,0),Bc.set(1,0),jd.set(1,1);let a=t.ray.intersectTriangle($a,cr,Ka,!1,or);if(a===null){if(Qa(cr.set(-0.5,0.5,0),ms,r,ps,i,s),Bc.set(0,1),a=t.ray.intersectTriangle($a,Ka,cr,!1,or),a===null)return}let o=t.ray.origin.distanceTo(or);if(o<t.near||o>t.far)return;e.push({distance:o,point:or.clone(),uv:We.getInterpolation(or,$a,cr,Ka,Qd,Bc,jd,new H),face:null,object:this})}copy(t,e){if(super.copy(t,e),t.center!==void 0)this.center.copy(t.center);return this.material=t.material,this}}function Qa(t,e,n,i,s,r){if(gs.subVectors(t,n).addScalar(0.5).multiply(i),s!==void 0)lr.x=r*gs.x-s*gs.y,lr.y=s*gs.x+r*gs.y;else lr.copy(gs);t.copy(e),t.x+=lr.x,t.y+=lr.y,t.applyMatrix4(Yp)}var ja=new E,tf=new E;class yl extends ne{constructor(){super();this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);let e=t.levels;for(let n=0,i=e.length;n<i;n++){let s=e[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);let i=this.levels,s;for(s=0;s<i.length;s++)if(e<i[s].distance)break;return i.splice(s,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){let e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){let i=e.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){let e=this.levels;if(e.length>0){let n,i;for(n=1,i=e.length;n<i;n++){let s=e[n].distance;if(e[n].object.visible)s-=s*e[n].hysteresis;if(t<s)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){ja.setFromMatrixPosition(this.matrixWorld);let i=t.ray.origin.distanceTo(ja);this.getObjectForDistance(i).raycast(t,e)}}update(t){let e=this.levels;if(e.length>1){ja.setFromMatrixPosition(t.matrixWorld),tf.setFromMatrixPosition(this.matrixWorld);let n=ja.distanceTo(tf)/t.zoom;e[0].object.visible=!0;let i,s;for(i=1,s=e.length;i<s;i++){let r=e[i].distance;if(e[i].object.visible)r-=r*e[i].hysteresis;if(n>=r)e[i-1].object.visible=!1,e[i].object.visible=!0;else break}this._currentLevel=i-1;for(;i<s;i++)e[i].object.visible=!1}}toJSON(t){let e=super.toJSON(t);if(this.autoUpdate===!1)e.object.autoUpdate=!1;e.object.levels=[];let n=this.levels;for(let i=0,s=n.length;i<s;i++){let r=n[i];e.object.levels.push({object:r.object.uuid,distance:r.distance,hysteresis:r.hysteresis})}return e}}var ef=new E,nf=new ee,sf=new ee,Wg=new E,rf=new Bt,to=new E,zc=new we,af=new Bt,kc=new Dn;class Ml extends pe{constructor(t,e){super(t,e);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Bt,this.bindMatrixInverse=new Bt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;if(this.boundingBox===null)this.boundingBox=new Ie;this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,to),this.boundingBox.expandByPoint(to)}computeBoundingSphere(){let t=this.geometry;if(this.boundingSphere===null)this.boundingSphere=new we;this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,to),this.boundingSphere.expandByPoint(to)}copy(t,e){if(super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null)this.boundingBox=t.boundingBox.clone();if(t.boundingSphere!==null)this.boundingSphere=t.boundingSphere.clone();return this}raycast(t,e){let n=this.material,i=this.matrixWorld;if(n===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(zc.copy(this.boundingSphere),zc.applyMatrix4(i),t.ray.intersectsSphere(zc)===!1)return;if(af.copy(i).invert(),kc.copy(t.ray).applyMatrix4(af),this.boundingBox!==null){if(kc.intersectsBox(this.boundingBox)===!1)return}this._computeIntersections(t,e,kc)}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){if(this.skeleton=t,e===void 0)this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld;this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ee,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);let s=1/t.manhattanLength();if(s!==1/0)t.multiplyScalar(s);else t.set(1,0,0,0);e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.bindMode==="attached")this.bindMatrixInverse.copy(this.matrixWorld).invert();else if(this.bindMode==="detached")this.bindMatrixInverse.copy(this.bindMatrix).invert();else console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,i=this.geometry;nf.fromBufferAttribute(i.attributes.skinIndex,t),sf.fromBufferAttribute(i.attributes.skinWeight,t),ef.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){let r=sf.getComponent(s);if(r!==0){let a=nf.getComponent(s);rf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Wg.copy(ef).applyMatrix4(rf),r)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Qr extends ne{constructor(){super();this.isBone=!0,this.type="Bone"}}class cn extends xe{constructor(t=null,e=1,n=1,i,s,r,a,o,l=1003,c=1003,h,u){super(null,r,a,o,l,c,i,s,h,u);this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var of=new Bt,Xg=new Bt;class jr{constructor(t=[],e=[]){this.uuid=en(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Bt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new Bt;if(this.bones[t])n.copy(this.bones[t].matrixWorld).invert();this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];if(n)n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];if(n){if(n.parent&&n.parent.isBone)n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld);else n.matrix.copy(n.matrixWorld);n.matrix.decompose(n.position,n.quaternion,n.scale)}}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,r=t.length;s<r;s++){let a=t[s]?t[s].matrixWorld:Xg;of.multiplyMatrices(a,e[s]),of.toArray(n,s*16)}if(i!==null)i.needsUpdate=!0}clone(){return new jr(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new cn(e,t,t,1023,1015);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let i=this.bones[e];if(i.name===t)return i}return}dispose(){if(this.boneTexture!==null)this.boneTexture.dispose(),this.boneTexture=null}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){let s=t.bones[n],r=e[s];if(r===void 0)console.warn("THREE.Skeleton: No bone found with UUID:",s),r=new Qr;this.bones.push(r),this.boneInverses.push(new Bt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){let r=e[i];t.bones.push(r.uuid);let a=n[i];t.boneInverses.push(a.toArray())}return t}}class ai extends se{constructor(t,e,n,i=1){super(t,e,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}var _s=new Bt,lf=new Bt,eo=[],cf=new Ie,qg=new Bt,hr=new pe,ur=new we;class Sl extends pe{constructor(t,e,n){super(t,e);this.isInstancedMesh=!0,this.instanceMatrix=new ai(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,qg)}computeBoundingBox(){let t=this.geometry,e=this.count;if(this.boundingBox===null)this.boundingBox=new Ie;if(t.boundingBox===null)t.computeBoundingBox();this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),cf.copy(t.boundingBox).applyMatrix4(_s),this.boundingBox.union(cf)}computeBoundingSphere(){let t=this.geometry,e=this.count;if(this.boundingSphere===null)this.boundingSphere=new we;if(t.boundingSphere===null)t.computeBoundingSphere();this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_s),ur.copy(t.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(ur)}copy(t,e){if(super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null)this.morphTexture=t.morphTexture.clone();if(t.instanceColor!==null)this.instanceColor=t.instanceColor.clone();if(this.count=t.count,t.boundingBox!==null)this.boundingBox=t.boundingBox.clone();if(t.boundingSphere!==null)this.boundingSphere=t.boundingSphere.clone();return this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,r=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[r+a]}raycast(t,e){let n=this.matrixWorld,i=this.count;if(hr.geometry=this.geometry,hr.material=this.material,hr.material===void 0)return;if(this.boundingSphere===null)this.computeBoundingSphere();if(ur.copy(this.boundingSphere),ur.applyMatrix4(n),t.ray.intersectsSphere(ur)===!1)return;for(let s=0;s<i;s++){this.getMatrixAt(s,_s),lf.multiplyMatrices(n,_s),hr.matrixWorld=lf,hr.raycast(t,eo);for(let r=0,a=eo.length;r<a;r++){let o=eo[r];o.instanceId=s,o.object=this,e.push(o)}eo.length=0}}setColorAt(t,e){if(this.instanceColor===null)this.instanceColor=new ai(new Float32Array(this.instanceMatrix.count*3).fill(1),3);e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){let n=e.morphTargetInfluences,i=n.length+1;if(this.morphTexture===null)this.morphTexture=new cn(new Float32Array(i*this.count),i,this.count,1028,1015);let s=this.morphTexture.source.data.data,r=0;for(let l=0;l<n.length;l++)r+=n[l];let a=this.geometry.morphTargetsRelative?1:1-r,o=i*t;s[o]=a,s.set(n,o+1)}updateMorphTargets(){}dispose(){if(this.dispatchEvent({type:"dispose"}),this.morphTexture!==null)this.morphTexture.dispose(),this.morphTexture=null}}var Hc=new E,Yg=new E,Zg=new Vt;class on{constructor(t=new E(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=Hc.subVectors(n,e).cross(Yg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(Hc),i=this.normal.dot(n);if(i===0){if(this.distanceToPoint(t.start)===0)return e.copy(t.start);return null}let s=-(t.start.dot(this.normal)+this.constant)/i;if(s<0||s>1)return null;return e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Zg.getNormalMatrix(t),i=this.coplanarPoint(Hc).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}var xi=new we,Jg=new H(0.5,0.5),no=new E;class ui{constructor(t=new on,e=new on,n=new on,i=new on,s=new on,r=new on){this.planes=[t,e,n,i,s,r]}set(t,e,n,i,s,r){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(r),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=2000,n=!1){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],v=s[13],x=s[14],M=s[15];if(i[0].setComponents(l-r,d-c,m-f,M-p).normalize(),i[1].setComponents(l+r,d+c,m+f,M+p).normalize(),i[2].setComponents(l+a,d+h,m+g,M+v).normalize(),i[3].setComponents(l-a,d-h,m-g,M-v).normalize(),n)i[4].setComponents(o,u,_,x).normalize(),i[5].setComponents(l-o,d-u,m-_,M-x).normalize();else if(i[4].setComponents(l-o,d-u,m-_,M-x).normalize(),e===2000)i[5].setComponents(l+o,d+u,m+_,M+x).normalize();else if(e===2001)i[5].setComponents(o,u,_,x).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0){if(t.boundingSphere===null)t.computeBoundingSphere();xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld)}else{let e=t.geometry;if(e.boundingSphere===null)e.computeBoundingSphere();xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){xi.center.set(0,0,0);let e=Jg.distanceTo(t.center);return xi.radius=0.7071067811865476+e,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(no.x=i.normal.x>0?t.max.x:t.min.x,no.y=i.normal.y>0?t.max.y:t.min.y,no.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(no)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}var An=new Bt,Cn=new ui;class ta{constructor(){this.coordinateSystem=2000}intersectsObject(t,e){if(!e.isArrayCamera||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){let i=e.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Cn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Cn.intersectsObject(t))return!0}return!1}intersectsSprite(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){let i=e.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Cn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Cn.intersectsSprite(t))return!0}return!1}intersectsSphere(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){let i=e.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Cn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Cn.intersectsSphere(t))return!0}return!1}intersectsBox(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){let i=e.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Cn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Cn.intersectsBox(t))return!0}return!1}containsPoint(t,e){if(!e||!e.cameras||e.cameras.length===0)return!1;for(let n=0;n<e.cameras.length;n++){let i=e.cameras[n];if(An.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Cn.setFromProjectionMatrix(An,i.coordinateSystem,i.reversedDepth),Cn.containsPoint(t))return!0}return!1}clone(){return new ta}}function Gc(t,e){return t-e}function $g(t,e){return t.z-e.z}function Kg(t,e){return e.z-t.z}class Zp{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,i){let s=this.pool,r=this.list;if(this.index>=s.length)s.push({start:-1,count:-1,z:-1,index:-1});let a=s[this.index];r.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}}var qe=new Bt,Qg=new dt(1,1,1),hf=new ui,jg=new ta,io=new Ie,vi=new we,dr=new E,uf=new E,t_=new E,Vc=new Zp,Oe=new pe,so=[];function e_(t,e,n=0){let i=e.itemSize;if(t.isInterleavedBufferAttribute||t.array.constructor!==e.array.constructor){let s=t.count;for(let r=0;r<s;r++)for(let a=0;a<i;a++)e.setComponent(r+n,a,t.getComponent(r,a))}else e.array.set(t.array,n*i);e.needsUpdate=!0}function yi(t,e){if(t.constructor!==e.constructor){let n=Math.min(t.length,e.length);for(let i=0;i<n;i++)e[i]=t[i]}else{let n=Math.min(t.length,e.length);e.set(new t.constructor(t.buffer,0,n))}}class bl extends pe{constructor(t,e,n=e*2,i){super(new Ht,i);this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4),n=new cn(e,t,t,1023,1015);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Uint32Array(t*t),n=new cn(e,t,t,1029,1014);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Float32Array(t*t*4).fill(1),n=new cn(e,t,t,1023,1015);n.colorSpace=Kt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){let e=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let s in t.attributes){let r=t.getAttribute(s),{array:a,itemSize:o,normalized:l}=r,c=new a.constructor(n*o),h=new se(c,o,l);e.setAttribute(s,h)}if(t.getIndex()!==null){let s=n>65535?new Uint32Array(i):new Uint16Array(i);e.setIndex(new se(s,1))}this._geometryInitialized=!0}}_validateGeometry(t){let e=this.geometry;if(Boolean(t.getIndex())!==Boolean(e.getIndex()))throw Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in e.attributes){if(!t.hasAttribute(n))throw Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=t.getAttribute(n),s=e.getAttribute(n);if(i.itemSize!==s.itemSize||i.normalized!==s.normalized)throw Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){let e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){let e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new Ie;let t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let s=e[n].geometryIndex;this.getMatrixAt(n,qe),this.getBoundingBoxAt(s,io).applyMatrix4(qe),t.union(io)}}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new we;let t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,i=e.length;n<i;n++){if(e[n].active===!1)continue;let s=e[n].geometryIndex;this.getMatrixAt(n,qe),this.getBoundingSphereAt(s,vi).applyMatrix4(qe),t.union(vi)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:t},i=null;if(this._availableInstanceIds.length>0)this._availableInstanceIds.sort(Gc),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n;else i=this._instanceInfo.length,this._instanceInfo.push(n);let s=this._matricesTexture;qe.identity().toArray(s.image.data,i*16),s.needsUpdate=!0;let r=this._colorsTexture;if(r)Qg.toArray(r.image.data,i*4),r.needsUpdate=!0;return this._visibilityChanged=!0,i}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},s=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=e===-1?t.getAttribute("position").count:e;let r=t.getIndex();if(r!==null)i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?r.count:n;if(i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let o;if(this._availableGeometryIds.length>0)this._availableGeometryIds.sort(Gc),o=this._availableGeometryIds.shift(),s[o]=i;else o=this._geometryCount,this._geometryCount++,s.push(i);return this.setGeometryAt(o,t),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,o}setGeometryAt(t,e){if(t>=this._geometryCount)throw Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);let n=this.geometry,i=n.getIndex()!==null,s=n.getIndex(),r=e.getIndex(),a=this._geometryInfo[t];if(i&&r.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let{vertexStart:o,reservedVertexCount:l}=a;a.vertexCount=e.getAttribute("position").count;for(let c in n.attributes){let h=e.getAttribute(c),u=n.getAttribute(c);e_(h,u,o);let d=h.itemSize;for(let f=h.count,g=l;f<g;f++){let _=o+f;for(let m=0;m<d;m++)u.setComponent(_,m,0)}u.needsUpdate=!0,u.addUpdateRange(o*d,l*d)}if(i){let{indexStart:c,reservedIndexCount:h}=a;a.indexCount=e.getIndex().count;for(let u=0;u<r.count;u++)s.setX(c+u,o+r.getX(u));for(let u=r.count,d=h;u<d;u++)s.setX(c+u,o);s.needsUpdate=!0,s.addUpdateRange(c,a.reservedIndexCount)}if(a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null)a.boundingBox=e.boundingBox.clone();if(a.boundingSphere=null,e.boundingSphere!==null)a.boundingSphere=e.boundingSphere.clone();return this._visibilityChanged=!0,t}deleteGeometry(t){let e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;let n=this._instanceInfo;for(let i=0,s=n.length;i<s;i++)if(n[i].active&&n[i].geometryIndex===t)this.deleteInstance(i);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0,n=this._geometryInfo,i=n.map((r,a)=>a).sort((r,a)=>n[r].vertexStart-n[a].vertexStart),s=this.geometry;for(let r=0,a=n.length;r<a;r++){let o=i[r],l=n[o];if(l.active===!1)continue;if(s.index!==null){if(l.indexStart!==e){let{indexStart:c,vertexStart:h,reservedIndexCount:u}=l,d=s.index,f=d.array,g=t-h;for(let _=c;_<c+u;_++)f[_]=f[_]+g;d.array.copyWithin(e,c,c+u),d.addUpdateRange(e,u),l.indexStart=e}e+=l.reservedIndexCount}if(l.vertexStart!==t){let{vertexStart:c,reservedVertexCount:h}=l,u=s.attributes;for(let d in u){let f=u[d],{array:g,itemSize:_}=f;g.copyWithin(t*_,c*_,(c+h)*_),f.addUpdateRange(t*_,h*_)}l.vertexStart=t}t+=l.reservedVertexCount,l.start=s.index?l.indexStart:l.vertexStart,this._nextIndexStart=s.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}return this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[t];if(i.boundingBox===null){let s=new Ie,r=n.index,a=n.attributes.position;for(let o=i.start,l=i.start+i.count;o<l;o++){let c=o;if(r)c=r.getX(c);s.expandByPoint(dr.fromBufferAttribute(a,c))}i.boundingBox=s}return e.copy(i.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[t];if(i.boundingSphere===null){let s=new we;this.getBoundingBoxAt(t,io),io.getCenter(s.center);let r=n.index,a=n.attributes.position,o=0;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;if(r)h=r.getX(h);dr.fromBufferAttribute(a,h),o=Math.max(o,s.center.distanceToSquared(dr))}s.radius=Math.sqrt(o),i.boundingSphere=s}return e.copy(i.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);let n=this._matricesTexture,i=this._matricesTexture.image.data;return e.toArray(i,t*16),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){if(this.validateInstanceId(t),this._colorsTexture===null)this._initColorsTexture();return e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){if(this.validateInstanceId(t),this._instanceInfo[t].visible===e)return this;return this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);let n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){let e=this._availableInstanceIds,n=this._instanceInfo;e.sort(Gc);while(e[e.length-1]===n.length-1)n.pop(),e.pop();if(t<n.length)throw Error(`BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);let i=new Int32Array(t),s=new Int32Array(t);yi(this._multiDrawCounts,i),yi(this._multiDrawStarts,s),this._multiDrawCounts=i,this._multiDrawStarts=s,this._maxInstanceCount=t;let r=this._indirectTexture,a=this._matricesTexture,o=this._colorsTexture;if(r.dispose(),this._initIndirectTexture(),yi(r.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),yi(a.image.data,this._matricesTexture.image.data),o)o.dispose(),this._initColorsTexture(),yi(o.image.data,this._colorsTexture.image.data)}setGeometrySize(t,e){let n=[...this._geometryInfo].filter((a)=>a.active);if(Math.max(...n.map((a)=>a.vertexStart+a.reservedVertexCount))>t)throw Error(`BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index){if(Math.max(...n.map((o)=>o.indexStart+o.reservedIndexCount))>e)throw Error(`BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`)}let s=this.geometry;if(s.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized)this._geometryInitialized=!1,this.geometry=new Ht,this._initializeGeometry(s);let r=this.geometry;if(s.index)yi(s.index.array,r.index.array);for(let a in s.attributes)yi(s.attributes[a].array,r.attributes[a].array)}raycast(t,e){let n=this._instanceInfo,i=this._geometryInfo,s=this.matrixWorld,r=this.geometry;if(Oe.material=this.material,Oe.geometry.index=r.index,Oe.geometry.attributes=r.attributes,Oe.geometry.boundingBox===null)Oe.geometry.boundingBox=new Ie;if(Oe.geometry.boundingSphere===null)Oe.geometry.boundingSphere=new we;for(let a=0,o=n.length;a<o;a++){if(!n[a].visible||!n[a].active)continue;let l=n[a].geometryIndex,c=i[l];Oe.geometry.setDrawRange(c.start,c.count),this.getMatrixAt(a,Oe.matrixWorld).premultiply(s),this.getBoundingBoxAt(l,Oe.geometry.boundingBox),this.getBoundingSphereAt(l,Oe.geometry.boundingSphere),Oe.raycast(t,so);for(let h=0,u=so.length;h<u;h++){let d=so[h];d.object=this,d.batchId=a,e.push(d)}so.length=0}Oe.material=null,Oe.geometry.index=null,Oe.geometry.attributes={},Oe.geometry.setDrawRange(0,1/0)}copy(t){if(super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map((e)=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map((e)=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null)this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice();return this}dispose(){if(this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null)this._colorsTexture.dispose(),this._colorsTexture=null}onBeforeRender(t,e,n,i,s){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let r=i.getIndex(),a=r===null?1:r.array.BYTES_PER_ELEMENT,o=this._instanceInfo,l=this._multiDrawStarts,c=this._multiDrawCounts,h=this._geometryInfo,u=this.perObjectFrustumCulled,d=this._indirectTexture,f=d.image.data,g=n.isArrayCamera?jg:hf;if(u&&!n.isArrayCamera)qe.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),hf.setFromProjectionMatrix(qe,n.coordinateSystem,n.reversedDepth);let _=0;if(this.sortObjects){qe.copy(this.matrixWorld).invert(),dr.setFromMatrixPosition(n.matrixWorld).applyMatrix4(qe),uf.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(qe);for(let v=0,x=o.length;v<x;v++)if(o[v].visible&&o[v].active){let M=o[v].geometryIndex;this.getMatrixAt(v,qe),this.getBoundingSphereAt(M,vi).applyMatrix4(qe);let R=!1;if(u)R=!g.intersectsSphere(vi,n);if(!R){let w=h[M],A=t_.subVectors(vi.center,dr).dot(uf);Vc.push(w.start,w.count,A,v)}}let m=Vc.list,p=this.customSort;if(p===null)m.sort(s.transparent?Kg:$g);else p.call(this,m,n);for(let v=0,x=m.length;v<x;v++){let M=m[v];l[_]=M.start*a,c[_]=M.count,f[_]=M.index,_++}Vc.reset()}else for(let m=0,p=o.length;m<p;m++)if(o[m].visible&&o[m].active){let v=o[m].geometryIndex,x=!1;if(u)this.getMatrixAt(m,qe),this.getBoundingSphereAt(v,vi).applyMatrix4(qe),x=!g.intersectsSphere(vi,n);if(!x){let M=h[v];l[_]=M.start*a,c[_]=M.count,f[_]=m,_++}}d.needsUpdate=!0,this._multiDrawCount=_,this._visibilityChanged=!1}onBeforeShadow(t,e,n,i,s,r){this.onBeforeRender(t,null,i,s,r)}}class Ue extends Le{constructor(t){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}var bo=new E,To=new E,df=new Bt,fr=new Dn,ro=new we,Wc=new E,ff=new E;class Pn extends ne{constructor(t=new Ht,e=new Ue){super();this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)bo.fromBufferAttribute(e,i-1),To.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=bo.distanceTo(To);t.setAttribute("lineDistance",new Mt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(ro.copy(n.boundingSphere),ro.applyMatrix4(i),ro.radius+=s,t.ray.intersectsSphere(ro)===!1)return;df.copy(i).invert(),fr.copy(t.ray).applyMatrix4(df);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=this.isLineSegments?2:1,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let m=c.getX(g),p=c.getX(g+1),v=ao(this,t,fr,o,m,p,g);if(v)e.push(v)}if(this.isLineLoop){let g=c.getX(f-1),_=c.getX(d),m=ao(this,t,fr,o,g,_,f-1);if(m)e.push(m)}}else{let d=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let g=d,_=f-1;g<_;g+=l){let m=ao(this,t,fr,o,g,g+1,g);if(m)e.push(m)}if(this.isLineLoop){let g=ao(this,t,fr,o,f-1,d,f-1);if(g)e.push(g)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ao(t,e,n,i,s,r,a){let o=t.geometry.attributes.position;if(bo.fromBufferAttribute(o,s),To.fromBufferAttribute(o,r),n.distanceSqToSegment(bo,To,Wc,ff)>i)return;Wc.applyMatrix4(t.matrixWorld);let c=e.ray.origin.distanceTo(Wc);if(c<e.near||c>e.far)return;return{distance:c,point:ff.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}var pf=new E,mf=new E;class fn extends Pn{constructor(t,e){super(t,e);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)pf.fromBufferAttribute(e,i),mf.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+pf.distanceTo(mf);t.setAttribute("lineDistance",new Mt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Tl extends Pn{constructor(t,e){super(t,e);this.isLineLoop=!0,this.type="LineLoop"}}class ea extends Le{constructor(t){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}var gf=new Bt,nh=new Dn,oo=new we,lo=new E;class El extends ne{constructor(t=new Ht,e=new ea){super();this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null)n.computeBoundingSphere();if(oo.copy(n.boundingSphere),oo.applyMatrix4(i),oo.radius+=s,t.ray.intersectsSphere(oo)===!1)return;gf.copy(i).invert(),nh.copy(t.ray).applyMatrix4(gf);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),o=a*a,l=n.index,h=n.attributes.position;if(l!==null){let u=Math.max(0,r.start),d=Math.min(l.count,r.start+r.count);for(let f=u,g=d;f<g;f++){let _=l.getX(f);lo.fromBufferAttribute(h,_),_f(lo,_,o,i,t,e,this)}}else{let u=Math.max(0,r.start),d=Math.min(h.count,r.start+r.count);for(let f=u,g=d;f<g;f++)lo.fromBufferAttribute(h,f),_f(lo,f,o,i,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=i.length;s<r;s++){let a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function _f(t,e,n,i,s,r,a){let o=nh.distanceSqToPoint(t);if(o<n){let l=new E;nh.closestPointToPoint(t,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class wl extends xe{constructor(t,e,n,i,s=1006,r=1006,a,o,l){super(t,e,n,i,s,r,a,o,l);this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let c=this;function h(){c.needsUpdate=!0,c._requestVideoFrameCallbackId=t.requestVideoFrameCallback(h)}if("requestVideoFrameCallback"in t)this._requestVideoFrameCallbackId=t.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){let t=this.image;if("requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA)this.needsUpdate=!0}dispose(){if(this._requestVideoFrameCallbackId!==0)this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId);super.dispose()}}class gu extends wl{constructor(t,e,n,i,s,r,a,o){super({},t,e,n,i,s,r,a,o);this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}}class _u extends xe{constructor(t,e){super({width:t,height:e});this.isFramebufferTexture=!0,this.magFilter=1003,this.minFilter=1003,this.generateMipmaps=!1,this.needsUpdate=!0}}class Hs extends xe{constructor(t,e,n,i,s,r,a,o,l,c,h,u){super(null,r,a,o,l,c,i,s,h,u);this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class xu extends Hs{constructor(t,e,n,i,s,r){super(t,e,n,s,r);this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=1001,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class vu extends Hs{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,301);this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class yu extends xe{constructor(t,e,n,i,s,r,a,o,l){super(t,e,n,i,s,r,a,o,l);this.isCanvasTexture=!0,this.needsUpdate=!0}}class na extends xe{constructor(t,e,n=1014,i,s,r,a=1003,o=1003,l,c=1026,h=1){if(c!==1026&&c!==1027)throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:h};super(u,i,s,r,a,o,c,n,l);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rn(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);if(this.compareFunction!==null)e.compareFunction=this.compareFunction;return e}}class ia extends xe{constructor(t=null){super();this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class sa extends Ht{constructor(t=1,e=1,n=4,i=8,s=1){super();this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:s},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));let r=[],a=[],o=[],l=[],c=e/2,h=Math.PI/2*t,u=e,d=2*h+u,f=n*2+s,g=i+1,_=new E,m=new E;for(let p=0;p<=f;p++){let v=0,x=0,M=0,R=0;if(p<=n){let L=p/n,S=L*Math.PI/2;x=-c-t*Math.cos(S),M=t*Math.sin(S),R=-t*Math.cos(S),v=L*h}else if(p<=n+s){let L=(p-n)/s;x=-c+L*e,M=t,R=0,v=h+L*u}else{let L=(p-n-s)/n,S=L*Math.PI/2;x=c+t*Math.sin(S),M=t*Math.cos(S),R=t*Math.sin(S),v=h+u+L*h}let w=Math.max(0,Math.min(1,v/d)),A=0;if(p===0)A=0.5/i;else if(p===f)A=-0.5/i;for(let L=0;L<=i;L++){let S=L/i,T=S*Math.PI*2,I=Math.sin(T),k=Math.cos(T);m.x=-M*k,m.y=x,m.z=M*I,a.push(m.x,m.y,m.z),_.set(-M*k,R,M*I),_.normalize(),o.push(_.x,_.y,_.z),l.push(S+A,w)}if(p>0){let L=(p-1)*g;for(let S=0;S<i;S++){let T=L+S,I=L+S+1,k=p*g+S,V=p*g+S+1;r.push(T,I,k),r.push(I,V,k)}}}this.setIndex(r),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(o,3)),this.setAttribute("uv",new Mt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sa(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class ra extends Ht{constructor(t=1,e=32,n=0,i=Math.PI*2){super();this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);let s=[],r=[],a=[],o=[],l=new E,c=new H;r.push(0,0,0),a.push(0,0,1),o.push(0.5,0.5);for(let h=0,u=3;h<=e;h++,u+=3){let d=n+h/e*i;l.x=t*Math.cos(d),l.y=t*Math.sin(d),r.push(l.x,l.y,l.z),a.push(0,0,1),c.x=(r[u]/t+1)/2,c.y=(r[u+1]/t+1)/2,o.push(c.x,c.y)}for(let h=1;h<=e;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Mt(r,3)),this.setAttribute("normal",new Mt(a,3)),this.setAttribute("uv",new Mt(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ra(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Gs extends Ht{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],h=[],u=[],d=[],f=0,g=[],_=n/2,m=0;if(p(),r===!1){if(t>0)v(!0);if(e>0)v(!1)}this.setIndex(c),this.setAttribute("position",new Mt(h,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function p(){let x=new E,M=new E,R=0,w=(e-t)/n;for(let A=0;A<=s;A++){let L=[],S=A/s,T=S*(e-t)+t;for(let I=0;I<=i;I++){let k=I/i,V=k*o+a,B=Math.sin(V),K=Math.cos(V);M.x=T*B,M.y=-S*n+_,M.z=T*K,h.push(M.x,M.y,M.z),x.set(B,w,K).normalize(),u.push(x.x,x.y,x.z),d.push(k,1-S),L.push(f++)}g.push(L)}for(let A=0;A<i;A++)for(let L=0;L<s;L++){let S=g[L][A],T=g[L+1][A],I=g[L+1][A+1],k=g[L][A+1];if(t>0||L!==0)c.push(S,T,k),R+=3;if(e>0||L!==s-1)c.push(T,I,k),R+=3}l.addGroup(m,R,0),m+=R}function v(x){let M=f,R=new H,w=new E,A=0,L=x===!0?t:e,S=x===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,_*S,0),u.push(0,S,0),d.push(0.5,0.5),f++;let T=f;for(let I=0;I<=i;I++){let V=I/i*o+a,B=Math.cos(V),K=Math.sin(V);w.x=L*K,w.y=_*S,w.z=L*B,h.push(w.x,w.y,w.z),u.push(0,S,0),R.x=B*0.5+0.5,R.y=K*0.5*S+0.5,d.push(R.x,R.y),f++}for(let I=0;I<i;I++){let k=M+I,V=T+I;if(x===!0)c.push(V,V+1,k);else c.push(V+1,V,k);A+=3}l.addGroup(m,A,x===!0?1:2),m+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vs extends Gs{constructor(t=1,e=1,n=32,i=1,s=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,s,r,a);this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Vs(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Zn extends Ht{constructor(t=[],e=[],n=1,i=0){super();this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],r=[];if(a(i),l(n),c(),this.setAttribute("position",new Mt(s,3)),this.setAttribute("normal",new Mt(s.slice(),3)),this.setAttribute("uv",new Mt(r,2)),i===0)this.computeVertexNormals();else this.normalizeNormals();function a(p){let v=new E,x=new E,M=new E;for(let R=0;R<e.length;R+=3)d(e[R+0],v),d(e[R+1],x),d(e[R+2],M),o(v,x,M,p)}function o(p,v,x,M){let R=M+1,w=[];for(let A=0;A<=R;A++){w[A]=[];let L=p.clone().lerp(x,A/R),S=v.clone().lerp(x,A/R),T=R-A;for(let I=0;I<=T;I++)if(I===0&&A===R)w[A][I]=L;else w[A][I]=L.clone().lerp(S,I/T)}for(let A=0;A<R;A++)for(let L=0;L<2*(R-A)-1;L++){let S=Math.floor(L/2);if(L%2===0)u(w[A][S+1]),u(w[A+1][S]),u(w[A][S]);else u(w[A][S+1]),u(w[A+1][S+1]),u(w[A+1][S])}}function l(p){let v=new E;for(let x=0;x<s.length;x+=3)v.x=s[x+0],v.y=s[x+1],v.z=s[x+2],v.normalize().multiplyScalar(p),s[x+0]=v.x,s[x+1]=v.y,s[x+2]=v.z}function c(){let p=new E;for(let v=0;v<s.length;v+=3){p.x=s[v+0],p.y=s[v+1],p.z=s[v+2];let x=_(p)/2/Math.PI+0.5,M=m(p)/Math.PI+0.5;r.push(x,1-M)}f(),h()}function h(){for(let p=0;p<r.length;p+=6){let v=r[p+0],x=r[p+2],M=r[p+4],R=Math.max(v,x,M),w=Math.min(v,x,M);if(R>0.9&&w<0.1){if(v<0.2)r[p+0]+=1;if(x<0.2)r[p+2]+=1;if(M<0.2)r[p+4]+=1}}}function u(p){s.push(p.x,p.y,p.z)}function d(p,v){let x=p*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function f(){let p=new E,v=new E,x=new E,M=new E,R=new H,w=new H,A=new H;for(let L=0,S=0;L<s.length;L+=9,S+=6){p.set(s[L+0],s[L+1],s[L+2]),v.set(s[L+3],s[L+4],s[L+5]),x.set(s[L+6],s[L+7],s[L+8]),R.set(r[S+0],r[S+1]),w.set(r[S+2],r[S+3]),A.set(r[S+4],r[S+5]),M.copy(p).add(v).add(x).divideScalar(3);let T=_(M);g(R,S+0,p,T),g(w,S+2,v,T),g(A,S+4,x,T)}}function g(p,v,x,M){if(M<0&&p.x===1)r[v]=p.x-1;if(x.x===0&&x.z===0)r[v]=M/2/Math.PI+0.5}function _(p){return Math.atan2(p.z,-p.x)}function m(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.vertices,t.indices,t.radius,t.details)}}class aa extends Zn{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e);this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new aa(t.radius,t.detail)}}var co=new E,ho=new E,Xc=new E,uo=new We;class Al extends Ht{constructor(t=null,e=1){super();if(this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),s=Math.cos(Ci*e),r=t.getIndex(),a=t.getAttribute("position"),o=r?r.count:a.count,l=[0,0,0],c=["a","b","c"],h=[,,,],u={},d=[];for(let f=0;f<o;f+=3){if(r)l[0]=r.getX(f),l[1]=r.getX(f+1),l[2]=r.getX(f+2);else l[0]=f,l[1]=f+1,l[2]=f+2;let{a:g,b:_,c:m}=uo;if(g.fromBufferAttribute(a,l[0]),_.fromBufferAttribute(a,l[1]),m.fromBufferAttribute(a,l[2]),uo.getNormal(Xc),h[0]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,h[1]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[0]===h[1]||h[1]===h[2]||h[2]===h[0])continue;for(let p=0;p<3;p++){let v=(p+1)%3,x=h[p],M=h[v],R=uo[c[p]],w=uo[c[v]],A=`${x}_${M}`,L=`${M}_${x}`;if(L in u&&u[L]){if(Xc.dot(u[L].normal)<=s)d.push(R.x,R.y,R.z),d.push(w.x,w.y,w.z);u[L]=null}else if(!(A in u))u[A]={index0:l[p],index1:l[v],normal:Xc.clone()}}}for(let f in u)if(u[f]){let{index0:g,index1:_}=u[f];co.fromBufferAttribute(a,g),ho.fromBufferAttribute(a,_),d.push(co.x,co.y,co.z),d.push(ho.x,ho.y,ho.z)}this.setAttribute("position",new Mt(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class nn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),s=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,s=n.length,r;if(e)r=e;else r=t*n[s-1];let a=0,o=s-1,l;while(a<=o)if(i=Math.floor(a+(o-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)o=i-1;else{o=i;break}if(i=o,n[i]===r)return i/(s-1);let c=n[i],u=n[i+1]-c,d=(r-c)/u;return(i+d)/(s-1)}getTangent(t,e){let i=t-0.0001,s=t+0.0001;if(i<0)i=0;if(s>1)s=1;let r=this.getPoint(i),a=this.getPoint(s),o=e||(r.isVector2?new H:new E);return o.copy(a).sub(r).normalize(),o}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new E,i=[],s=[],r=[],a=new E,o=new Bt;for(let d=0;d<=t;d++){let f=d/t;i[d]=this.getTangentAt(f,new E)}s[0]=new E,r[0]=new E;let l=Number.MAX_VALUE,c=Math.abs(i[0].x),h=Math.abs(i[0].y),u=Math.abs(i[0].z);if(c<=l)l=c,n.set(1,0,0);if(h<=l)l=h,n.set(0,1,0);if(u<=l)n.set(0,0,1);a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),r[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),r[d]=r[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();let f=Math.acos(Ot(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(o.makeRotationAxis(a,f))}r[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(Ot(s[0].dot(s[t]),-1,1));if(d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0)d=-d;for(let f=1;f<=t;f++)s[f].applyMatrix4(o.makeRotationAxis(i[f],d*f)),r[f].crossVectors(i[f],s[f])}return{tangents:i,normals:s,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ws extends nn{constructor(t=0,e=0,n=1,i=1,s=0,r=Math.PI*2,a=!1,o=0){super();this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=r,this.aClockwise=a,this.aRotation=o}getPoint(t,e=new H){let n=e,i=Math.PI*2,s=this.aEndAngle-this.aStartAngle,r=Math.abs(s)<Number.EPSILON;while(s<0)s+=i;while(s>i)s-=i;if(s<Number.EPSILON)if(r)s=0;else s=i;if(this.aClockwise===!0&&!r)if(s===i)s=-i;else s=s-i;let a=this.aStartAngle+t*s,o=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),u=o-this.aX,d=l-this.aY;o=u*c-d*h+this.aX,l=u*h+d*c+this.aY}return n.set(o,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Cl extends Ws{constructor(t,e,n,i,s,r){super(t,e,n,n,i,s,r);this.isArcCurve=!0,this.type="ArcCurve"}}function Mu(){let t=0,e=0,n=0,i=0;function s(r,a,o,l){t=r,e=o,n=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,u){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return t+e*r+n*a+i*o}}}var fo=new E,qc=new Mu,Yc=new Mu,Zc=new Mu;class Rl extends nn{constructor(t=[],e=!1,n="centripetal",i=0.5){super();this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new E){let n=e,i=this.points,s=i.length,r=(s-(this.closed?0:1))*t,a=Math.floor(r),o=r-a;if(this.closed)a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s;else if(o===0&&a===s-1)a=s-2,o=1;let l,c;if(this.closed||a>0)l=i[(a-1)%s];else fo.subVectors(i[0],i[1]).add(i[0]),l=fo;let h=i[a%s],u=i[(a+1)%s];if(this.closed||a+2<s)c=i[(a+2)%s];else fo.subVectors(i[s-1],i[s-2]).add(i[s-1]),c=fo;if(this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?0.5:0.25,f=Math.pow(l.distanceToSquared(h),d),g=Math.pow(h.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(c),d);if(g<0.0001)g=1;if(f<0.0001)f=g;if(_<0.0001)_=g;qc.initNonuniformCatmullRom(l.x,h.x,u.x,c.x,f,g,_),Yc.initNonuniformCatmullRom(l.y,h.y,u.y,c.y,f,g,_),Zc.initNonuniformCatmullRom(l.z,h.z,u.z,c.z,f,g,_)}else if(this.curveType==="catmullrom")qc.initCatmullRom(l.x,h.x,u.x,c.x,this.tension),Yc.initCatmullRom(l.y,h.y,u.y,c.y,this.tension),Zc.initCatmullRom(l.z,h.z,u.z,c.z,this.tension);return n.set(qc.calc(o),Yc.calc(o),Zc.calc(o)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new E().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function xf(t,e,n,i,s){let r=(i-e)*0.5,a=(s-n)*0.5,o=t*t,l=t*o;return(2*n-2*i+r+a)*l+(-3*n+3*i-2*r-a)*o+r*t+n}function n_(t,e){let n=1-t;return n*n*e}function i_(t,e){return 2*(1-t)*t*e}function s_(t,e){return t*t*e}function xr(t,e,n,i){return n_(t,e)+i_(t,n)+s_(t,i)}function r_(t,e){let n=1-t;return n*n*n*e}function a_(t,e){let n=1-t;return 3*n*n*t*e}function o_(t,e){return 3*(1-t)*t*t*e}function l_(t,e){return t*t*t*e}function vr(t,e,n,i,s){return r_(t,e)+a_(t,n)+o_(t,i)+l_(t,s)}class oa extends nn{constructor(t=new H,e=new H,n=new H,i=new H){super();this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new H){let n=e,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(vr(t,i.x,s.x,r.x,a.x),vr(t,i.y,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Pl extends nn{constructor(t=new E,e=new E,n=new E,i=new E){super();this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new E){let n=e,i=this.v0,s=this.v1,r=this.v2,a=this.v3;return n.set(vr(t,i.x,s.x,r.x,a.x),vr(t,i.y,s.y,r.y,a.y),vr(t,i.z,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class la extends nn{constructor(t=new H,e=new H){super();this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new H){let n=e;if(t===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1);return n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Il extends nn{constructor(t=new E,e=new E){super();this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new E){let n=e;if(t===1)n.copy(this.v2);else n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1);return n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new E){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ca extends nn{constructor(t=new H,e=new H,n=new H){super();this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){let n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(xr(t,i.x,s.x,r.x),xr(t,i.y,s.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ha extends nn{constructor(t=new E,e=new E,n=new E){super();this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new E){let n=e,i=this.v0,s=this.v1,r=this.v2;return n.set(xr(t,i.x,s.x,r.x),xr(t,i.y,s.y,r.y),xr(t,i.z,s.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ua extends nn{constructor(t=[]){super();this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new H){let n=e,i=this.points,s=(i.length-1)*t,r=Math.floor(s),a=s-r,o=i[r===0?r:r-1],l=i[r],c=i[r>i.length-2?i.length-1:r+1],h=i[r>i.length-3?i.length-1:r+2];return n.set(xf(a,o.x,l.x,c.x,h.x),xf(a,o.y,l.y,c.y,h.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new H().fromArray(i))}return this}}var Eo=Object.freeze({__proto__:null,ArcCurve:Cl,CatmullRomCurve3:Rl,CubicBezierCurve:oa,CubicBezierCurve3:Pl,EllipseCurve:Ws,LineCurve:la,LineCurve3:Il,QuadraticBezierCurve:ca,QuadraticBezierCurve3:ha,SplineCurve:ua});class Dl extends nn{constructor(){super();this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Eo[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),s=0;while(s<i.length){if(i[s]>=n){let r=i[s]-n,a=this.curves[s],o=a.getLength(),l=o===0?0:1-r/o;return a.getPointAt(l,e)}s++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));if(this.autoClose)e.push(e[0]);return e}getPoints(t=12){let e=[],n;for(let i=0,s=this.curves;i<s.length;i++){let r=s[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,o=r.getPoints(a);for(let l=0;l<o.length;l++){let c=o[l];if(n&&n.equals(c))continue;e.push(c),n=c}}if(this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0]))e.push(e[0]);return e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new Eo[i.type]().fromJSON(i))}return this}}class Es extends Dl{constructor(t){super();if(this.type="Path",this.currentPoint=new H,t)this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new la(this.currentPoint.clone(),new H(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let s=new ca(this.currentPoint.clone(),new H(t,e),new H(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,r){let a=new oa(this.currentPoint.clone(),new H(t,e),new H(n,i),new H(s,r));return this.curves.push(a),this.currentPoint.set(s,r),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ua(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,r){let a=this.currentPoint.x,o=this.currentPoint.y;return this.absarc(t+a,e+o,n,i,s,r),this}absarc(t,e,n,i,s,r){return this.absellipse(t,e,n,n,i,s,r),this}ellipse(t,e,n,i,s,r,a,o){let l=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+l,e+c,n,i,s,r,a,o),this}absellipse(t,e,n,i,s,r,a,o){let l=new Ws(t,e,n,i,s,r,a,o);if(this.curves.length>0){let h=l.getPoint(0);if(!h.equals(this.currentPoint))this.lineTo(h.x,h.y)}this.curves.push(l);let c=l.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Vn extends Es{constructor(t){super(t);this.uuid=en(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Es().fromJSON(i))}return this}}function c_(t,e,n=2){let i=e&&e.length,s=i?e[0]*n:t.length,r=Jp(t,0,s,n,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(i)r=p_(t,e,r,n);if(t.length>80*n){o=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=n;d<s;d+=n){let f=t[d],g=t[d+1];if(f<o)o=f;if(g<l)l=g;if(f>h)h=f;if(g>u)u=g}c=Math.max(h-o,u-l),c=c!==0?32767/c:0}return yr(r,a,n,o,l,c,0),a}function Jp(t,e,n,i,s){let r;if(s===E_(t,e,n,i)>0)for(let a=e;a<n;a+=i)r=vf(a/i|0,t[a],t[a+1],r);else for(let a=n-i;a>=e;a-=i)r=vf(a/i|0,t[a],t[a+1],r);if(r&&ws(r,r.next))Sr(r),r=r.next;return r}function Pi(t,e){if(!t)return t;if(!e)e=t;let n=t,i;do if(i=!1,!n.steiner&&(ws(n,n.next)||_e(n.prev,n,n.next)===0)){if(Sr(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function yr(t,e,n,i,s,r,a){if(!t)return;if(!a&&r)v_(t,i,s,r);let o=t;while(t.prev!==t.next){let l=t.prev,c=t.next;if(r?u_(t,i,s,r):h_(t)){e.push(l.i,t.i,c.i),Sr(t),t=c.next,o=c.next;continue}if(t=c,t===o){if(!a)yr(Pi(t),e,n,i,s,r,1);else if(a===1)t=d_(Pi(t),e),yr(t,e,n,i,s,r,2);else if(a===2)f_(t,e,n,i,s,r);break}}}function h_(t){let e=t.prev,n=t,i=t.next;if(_e(e,n,i)>=0)return!1;let s=e.x,r=n.x,a=i.x,o=e.y,l=n.y,c=i.y,h=Math.min(s,r,a),u=Math.min(o,l,c),d=Math.max(s,r,a),f=Math.max(o,l,c),g=i.next;while(g!==e){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&gr(s,o,r,l,a,c,g.x,g.y)&&_e(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function u_(t,e,n,i){let s=t.prev,r=t,a=t.next;if(_e(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,l,c),g=Math.min(h,u,d),_=Math.max(o,l,c),m=Math.max(h,u,d),p=ih(f,g,e,n,i),v=ih(_,m,e,n,i),{prevZ:x,nextZ:M}=t;while(x&&x.z>=p&&M&&M.z<=v){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&gr(o,h,l,u,c,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;if(x=x.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&gr(o,h,l,u,c,d,M.x,M.y)&&_e(M.prev,M,M.next)>=0)return!1;M=M.nextZ}while(x&&x.z>=p){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&gr(o,h,l,u,c,d,x.x,x.y)&&_e(x.prev,x,x.next)>=0)return!1;x=x.prevZ}while(M&&M.z<=v){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&gr(o,h,l,u,c,d,M.x,M.y)&&_e(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function d_(t,e){let n=t;do{let i=n.prev,s=n.next.next;if(!ws(i,s)&&Kp(i,n,n.next,s)&&Mr(i,s)&&Mr(s,i))e.push(i.i,n.i,s.i),Sr(n),Sr(n.next),n=t=s;n=n.next}while(n!==t);return Pi(n)}function f_(t,e,n,i,s,r){let a=t;do{let o=a.next.next;while(o!==a.prev){if(a.i!==o.i&&S_(a,o)){let l=Qp(a,o);a=Pi(a,a.next),l=Pi(l,l.next),yr(a,e,n,i,s,r,0),yr(l,e,n,i,s,r,0);return}o=o.next}a=a.next}while(a!==t)}function p_(t,e,n,i){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*i,l=r<a-1?e[r+1]*i:t.length,c=Jp(t,o,l,i,!1);if(c===c.next)c.steiner=!0;s.push(M_(c))}s.sort(m_);for(let r=0;r<s.length;r++)n=g_(s[r],n);return n}function m_(t,e){let n=t.x-e.x;if(n===0){if(n=t.y-e.y,n===0){let i=(t.next.y-t.y)/(t.next.x-t.x),s=(e.next.y-e.y)/(e.next.x-e.x);n=i-s}}return n}function g_(t,e){let n=__(t,e);if(!n)return e;let i=Qp(n,t);return Pi(i,i.next),Pi(n,n.next)}function __(t,e){let n=e,{x:i,y:s}=t,r=-1/0,a;if(ws(t,n))return n;do{if(ws(t,n.next))return n.next;else if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){let u=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(u<=i&&u>r){if(r=u,a=n.x<n.next.x?n:n.next,u===i)return a}}n=n.next}while(n!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;n=a;do{if(i>=n.x&&n.x>=l&&i!==n.x&&$p(s<c?i:r,s,l,c,s<c?r:i,s,n.x,n.y)){let u=Math.abs(s-n.y)/(i-n.x);if(Mr(n,t)&&(u<h||u===h&&(n.x>a.x||n.x===a.x&&x_(a,n))))a=n,h=u}n=n.next}while(n!==o);return a}function x_(t,e){return _e(t.prev,t,e.prev)<0&&_e(e.next,t,t.next)<0}function v_(t,e,n,i){let s=t;do{if(s.z===0)s.z=ih(s.x,s.y,e,n,i);s.prevZ=s.prev,s.nextZ=s.next,s=s.next}while(s!==t);s.prevZ.nextZ=null,s.prevZ=null,y_(s)}function y_(t){let e,n=1;do{let i=t,s;t=null;let r=null;e=0;while(i){e++;let a=i,o=0;for(let c=0;c<n;c++)if(o++,a=a.nextZ,!a)break;let l=n;while(o>0||l>0&&a){if(o!==0&&(l===0||!a||i.z<=a.z))s=i,i=i.nextZ,o--;else s=a,a=a.nextZ,l--;if(r)r.nextZ=s;else t=s;s.prevZ=r,r=s}i=a}r.nextZ=null,n*=2}while(e>1);return t}function ih(t,e,n,i,s){return t=(t-n)*s|0,e=(e-i)*s|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function M_(t){let e=t,n=t;do{if(e.x<n.x||e.x===n.x&&e.y<n.y)n=e;e=e.next}while(e!==t);return n}function $p(t,e,n,i,s,r,a,o){return(s-a)*(e-o)>=(t-a)*(r-o)&&(t-a)*(i-o)>=(n-a)*(e-o)&&(n-a)*(r-o)>=(s-a)*(i-o)}function gr(t,e,n,i,s,r,a,o){return!(t===a&&e===o)&&$p(t,e,n,i,s,r,a,o)}function S_(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!b_(t,e)&&(Mr(t,e)&&Mr(e,t)&&T_(t,e)&&(_e(t.prev,t,e.prev)||_e(t,e.prev,e))||ws(t,e)&&_e(t.prev,t,t.next)>0&&_e(e.prev,e,e.next)>0)}function _e(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function ws(t,e){return t.x===e.x&&t.y===e.y}function Kp(t,e,n,i){let s=mo(_e(t,e,n)),r=mo(_e(t,e,i)),a=mo(_e(n,i,t)),o=mo(_e(n,i,e));if(s!==r&&a!==o)return!0;if(s===0&&po(t,n,e))return!0;if(r===0&&po(t,i,e))return!0;if(a===0&&po(n,t,i))return!0;if(o===0&&po(n,e,i))return!0;return!1}function po(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function mo(t){return t>0?1:t<0?-1:0}function b_(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&Kp(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Mr(t,e){return _e(t.prev,t,t.next)<0?_e(t,e,t.next)>=0&&_e(t,t.prev,e)>=0:_e(t,e,t.prev)<0||_e(t,t.next,e)<0}function T_(t,e){let n=t,i=!1,s=(t.x+e.x)/2,r=(t.y+e.y)/2;do{if(n.y>r!==n.next.y>r&&n.next.y!==n.y&&s<(n.next.x-n.x)*(r-n.y)/(n.next.y-n.y)+n.x)i=!i;n=n.next}while(n!==t);return i}function Qp(t,e){let n=sh(t.i,t.x,t.y),i=sh(e.i,e.x,e.y),s=t.next,r=e.prev;return t.next=e,e.prev=t,n.next=s,s.prev=n,i.next=n,n.prev=i,r.next=i,i.prev=r,i}function vf(t,e,n,i){let s=sh(t,e,n);if(!i)s.prev=s,s.next=s;else s.next=i.next,s.prev=i,i.next.prev=s,i.next=s;return s}function Sr(t){if(t.next.prev=t.prev,t.prev.next=t.next,t.prevZ)t.prevZ.nextZ=t.nextZ;if(t.nextZ)t.nextZ.prevZ=t.prevZ}function sh(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function E_(t,e,n,i){let s=0;for(let r=e,a=n-i;r<n;r+=i)s+=(t[a]-t[r])*(t[r+1]+t[a+1]),a=r;return s}class jp{static triangulate(t,e,n=2){return c_(t,e,n)}}class ln{static area(t){let e=t.length,n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*0.5}static isClockWise(t){return ln.area(t)<0}static triangulateShape(t,e){let n=[],i=[],s=[];yf(t),Mf(n,t);let r=t.length;e.forEach(yf);for(let o=0;o<e.length;o++)i.push(r),r+=e[o].length,Mf(n,e[o]);let a=jp.triangulate(n,i);for(let o=0;o<a.length;o+=3)s.push(a.slice(o,o+3));return s}}function yf(t){let e=t.length;if(e>2&&t[e-1].equals(t[0]))t.pop()}function Mf(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class da extends Ht{constructor(t=new Vn([new H(0.5,0.5),new H(-0.5,0.5),new H(-0.5,-0.5),new H(0.5,-0.5)]),e={}){super();this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],s=[];for(let a=0,o=t.length;a<o;a++){let l=t[a];r(l)}this.setAttribute("position",new Mt(i,3)),this.setAttribute("uv",new Mt(s,2)),this.computeVertexNormals();function r(a){let o=[],l=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,d=e.bevelThickness!==void 0?e.bevelThickness:0.2,f=e.bevelSize!==void 0?e.bevelSize:d-0.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,_=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,p=e.UVGenerator!==void 0?e.UVGenerator:w_,v,x=!1,M,R,w,A;if(m)v=m.getSpacedPoints(c),x=!0,u=!1,M=m.computeFrenetFrames(c,!1),R=new E,w=new E,A=new E;if(!u)_=0,d=0,f=0,g=0;let L=a.extractPoints(l),{shape:S,holes:T}=L;if(!ln.isClockWise(S)){S=S.reverse();for(let tt=0,Q=T.length;tt<Q;tt++){let J=T[tt];if(ln.isClockWise(J))T[tt]=J.reverse()}}function k(tt){let Y=tt[0];for(let ht=1;ht<=tt.length;ht++){let ot=ht%tt.length,st=tt[ot],Xt=st.x-Y.x,qt=st.y-Y.y,Zt=Xt*Xt+qt*qt,C=Math.max(Math.abs(st.x),Math.abs(st.y),Math.abs(Y.x),Math.abs(Y.y)),y=0.000000000000000000010000000000000001*C*C;if(Zt<=y){tt.splice(ot,1),ht--;continue}Y=st}}k(S),T.forEach(k);let V=T.length,B=S;for(let tt=0;tt<V;tt++){let Q=T[tt];S=S.concat(Q)}function K(tt,Q,J){if(!Q)console.error("THREE.ExtrudeGeometry: vec does not exist");return tt.clone().addScaledVector(Q,J)}let W=S.length;function nt(tt,Q,J){let Y,ht,ot,st=tt.x-Q.x,Xt=tt.y-Q.y,qt=J.x-tt.x,Zt=J.y-tt.y,C=st*st+Xt*Xt,y=st*Zt-Xt*qt;if(Math.abs(y)>Number.EPSILON){let U=Math.sqrt(C),q=Math.sqrt(qt*qt+Zt*Zt),et=Q.x-Xt/U,X=Q.y+st/U,St=J.x-Zt/q,lt=J.y+qt/q,wt=((St-et)*Zt-(lt-X)*qt)/(st*Zt-Xt*qt);Y=et+st*wt-tt.x,ht=X+Xt*wt-tt.y;let Nt=Y*Y+ht*ht;if(Nt<=2)return new H(Y,ht);else ot=Math.sqrt(Nt/2)}else{let U=!1;if(st>Number.EPSILON){if(qt>Number.EPSILON)U=!0}else if(st<-Number.EPSILON){if(qt<-Number.EPSILON)U=!0}else if(Math.sign(Xt)===Math.sign(Zt))U=!0;if(U)Y=-Xt,ht=st,ot=Math.sqrt(C);else Y=st,ht=Xt,ot=Math.sqrt(C/2)}return new H(Y/ot,ht/ot)}let G=[];for(let tt=0,Q=B.length,J=Q-1,Y=tt+1;tt<Q;tt++,J++,Y++){if(J===Q)J=0;if(Y===Q)Y=0;G[tt]=nt(B[tt],B[J],B[Y])}let ft=[],pt,Dt=G.concat();for(let tt=0,Q=V;tt<Q;tt++){let J=T[tt];pt=[];for(let Y=0,ht=J.length,ot=ht-1,st=Y+1;Y<ht;Y++,ot++,st++){if(ot===ht)ot=0;if(st===ht)st=0;pt[Y]=nt(J[Y],J[ot],J[st])}ft.push(pt),Dt=Dt.concat(pt)}let Wt;if(_===0)Wt=ln.triangulateShape(B,T);else{let tt=[],Q=[];for(let J=0;J<_;J++){let Y=J/_,ht=d*Math.cos(Y*Math.PI/2),ot=f*Math.sin(Y*Math.PI/2)+g;for(let st=0,Xt=B.length;st<Xt;st++){let qt=K(B[st],G[st],ot);if(bt(qt.x,qt.y,-ht),Y===0)tt.push(qt)}for(let st=0,Xt=V;st<Xt;st++){let qt=T[st];pt=ft[st];let Zt=[];for(let C=0,y=qt.length;C<y;C++){let U=K(qt[C],pt[C],ot);if(bt(U.x,U.y,-ht),Y===0)Zt.push(U)}if(Y===0)Q.push(Zt)}}Wt=ln.triangulateShape(tt,Q)}let de=Wt.length,jt=f+g;for(let tt=0;tt<W;tt++){let Q=u?K(S[tt],Dt[tt],jt):S[tt];if(!x)bt(Q.x,Q.y,0);else w.copy(M.normals[0]).multiplyScalar(Q.x),R.copy(M.binormals[0]).multiplyScalar(Q.y),A.copy(v[0]).add(w).add(R),bt(A.x,A.y,A.z)}for(let tt=1;tt<=c;tt++)for(let Q=0;Q<W;Q++){let J=u?K(S[Q],Dt[Q],jt):S[Q];if(!x)bt(J.x,J.y,h/c*tt);else w.copy(M.normals[tt]).multiplyScalar(J.x),R.copy(M.binormals[tt]).multiplyScalar(J.y),A.copy(v[tt]).add(w).add(R),bt(A.x,A.y,A.z)}for(let tt=_-1;tt>=0;tt--){let Q=tt/_,J=d*Math.cos(Q*Math.PI/2),Y=f*Math.sin(Q*Math.PI/2)+g;for(let ht=0,ot=B.length;ht<ot;ht++){let st=K(B[ht],G[ht],Y);bt(st.x,st.y,h+J)}for(let ht=0,ot=T.length;ht<ot;ht++){let st=T[ht];pt=ft[ht];for(let Xt=0,qt=st.length;Xt<qt;Xt++){let Zt=K(st[Xt],pt[Xt],Y);if(!x)bt(Zt.x,Zt.y,h+J);else bt(Zt.x,Zt.y+v[c-1].y,v[c-1].x+J)}}}Z(),mt();function Z(){let tt=i.length/3;if(u){let Q=0,J=W*Q;for(let Y=0;Y<de;Y++){let ht=Wt[Y];Ut(ht[2]+J,ht[1]+J,ht[0]+J)}Q=c+_*2,J=W*Q;for(let Y=0;Y<de;Y++){let ht=Wt[Y];Ut(ht[0]+J,ht[1]+J,ht[2]+J)}}else{for(let Q=0;Q<de;Q++){let J=Wt[Q];Ut(J[2],J[1],J[0])}for(let Q=0;Q<de;Q++){let J=Wt[Q];Ut(J[0]+W*c,J[1]+W*c,J[2]+W*c)}}n.addGroup(tt,i.length/3-tt,0)}function mt(){let tt=i.length/3,Q=0;ct(B,Q),Q+=B.length;for(let J=0,Y=T.length;J<Y;J++){let ht=T[J];ct(ht,Q),Q+=ht.length}n.addGroup(tt,i.length/3-tt,1)}function ct(tt,Q){let J=tt.length;while(--J>=0){let Y=J,ht=J-1;if(ht<0)ht=tt.length-1;for(let ot=0,st=c+_*2;ot<st;ot++){let Xt=W*ot,qt=W*(ot+1),Zt=Q+Y+Xt,C=Q+ht+Xt,y=Q+ht+qt,U=Q+Y+qt;zt(Zt,C,y,U)}}}function bt(tt,Q,J){o.push(tt),o.push(Q),o.push(J)}function Ut(tt,Q,J){ae(tt),ae(Q),ae(J);let Y=i.length/3,ht=p.generateTopUV(n,i,Y-3,Y-2,Y-1);P(ht[0]),P(ht[1]),P(ht[2])}function zt(tt,Q,J,Y){ae(tt),ae(Q),ae(Y),ae(Q),ae(J),ae(Y);let ht=i.length/3,ot=p.generateSideWallUV(n,i,ht-6,ht-3,ht-2,ht-1);P(ot[0]),P(ot[1]),P(ot[3]),P(ot[1]),P(ot[2]),P(ot[3])}function ae(tt){i.push(o[tt*3+0]),i.push(o[tt*3+1]),i.push(o[tt*3+2])}function P(tt){s.push(tt.x),s.push(tt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return A_(e,n,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let a=e[t.shapes[s]];n.push(a)}let i=t.options.extrudePath;if(i!==void 0)t.options.extrudePath=new Eo[i.type]().fromJSON(i);return new da(n,t.options)}}var w_={generateTopUV:function(t,e,n,i,s){let r=e[n*3],a=e[n*3+1],o=e[i*3],l=e[i*3+1],c=e[s*3],h=e[s*3+1];return[new H(r,a),new H(o,l),new H(c,h)]},generateSideWallUV:function(t,e,n,i,s,r){let a=e[n*3],o=e[n*3+1],l=e[n*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];if(Math.abs(o-h)<Math.abs(a-c))return[new H(a,1-l),new H(c,1-u),new H(d,1-g),new H(_,1-p)];else return[new H(o,1-l),new H(h,1-u),new H(f,1-g),new H(m,1-p)]}};function A_(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let r=t[i];n.shapes.push(r.uuid)}else n.shapes.push(t.uuid);if(n.options=Object.assign({},e),e.extrudePath!==void 0)n.options.extrudePath=e.extrudePath.toJSON();return n}class fa extends Zn{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e);this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new fa(t.radius,t.detail)}}class pa extends Ht{constructor(t=[new H(0,-0.5),new H(0.5,0),new H(0,0.5)],e=12,n=0,i=Math.PI*2){super();this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ot(i,0,Math.PI*2);let s=[],r=[],a=[],o=[],l=[],c=1/e,h=new E,u=new H,d=new E,f=new E,g=new E,_=0,m=0;for(let p=0;p<=t.length-1;p++)switch(p){case 0:_=t[p+1].x-t[p].x,m=t[p+1].y-t[p].y,d.x=m*1,d.y=-_,d.z=m*0,g.copy(d),d.normalize(),o.push(d.x,d.y,d.z);break;case t.length-1:o.push(g.x,g.y,g.z);break;default:_=t[p+1].x-t[p].x,m=t[p+1].y-t[p].y,d.x=m*1,d.y=-_,d.z=m*0,f.copy(d),d.x+=g.x,d.y+=g.y,d.z+=g.z,d.normalize(),o.push(d.x,d.y,d.z),g.copy(f)}for(let p=0;p<=e;p++){let v=n+p*c*i,x=Math.sin(v),M=Math.cos(v);for(let R=0;R<=t.length-1;R++){h.x=t[R].x*x,h.y=t[R].y,h.z=t[R].x*M,r.push(h.x,h.y,h.z),u.x=p/e,u.y=R/(t.length-1),a.push(u.x,u.y);let w=o[3*R+0]*x,A=o[3*R+1],L=o[3*R+0]*M;l.push(w,A,L)}}for(let p=0;p<e;p++)for(let v=0;v<t.length-1;v++){let x=v+p*t.length,M=x,R=x+t.length,w=x+t.length+1,A=x+1;s.push(M,R,A),s.push(w,A,R)}this.setIndex(s),this.setAttribute("position",new Mt(r,3)),this.setAttribute("uv",new Mt(a,2)),this.setAttribute("normal",new Mt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pa(t.points,t.segments,t.phiStart,t.phiLength)}}class Xs extends Zn{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e);this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Xs(t.radius,t.detail)}}class Wi extends Ht{constructor(t=1,e=1,n=1,i=1){super();this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let s=t/2,r=e/2,a=Math.floor(n),o=Math.floor(i),l=a+1,c=o+1,h=t/a,u=e/o,d=[],f=[],g=[],_=[];for(let m=0;m<c;m++){let p=m*u-r;for(let v=0;v<l;v++){let x=v*h-s;f.push(x,-p,0),g.push(0,0,1),_.push(v/a),_.push(1-m/o)}}for(let m=0;m<o;m++)for(let p=0;p<a;p++){let v=p+l*m,x=p+l*(m+1),M=p+1+l*(m+1),R=p+1+l*m;d.push(v,x,R),d.push(x,M,R)}this.setIndex(d),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(g,3)),this.setAttribute("uv",new Mt(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.widthSegments,t.heightSegments)}}class ma extends Ht{constructor(t=0.5,e=1,n=32,i=1,s=0,r=Math.PI*2){super();this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);let a=[],o=[],l=[],c=[],h=t,u=(e-t)/i,d=new E,f=new H;for(let g=0;g<=i;g++){for(let _=0;_<=n;_++){let m=s+_/n*r;d.x=h*Math.cos(m),d.y=h*Math.sin(m),o.push(d.x,d.y,d.z),l.push(0,0,1),f.x=(d.x/e+1)/2,f.y=(d.y/e+1)/2,c.push(f.x,f.y)}h+=u}for(let g=0;g<i;g++){let _=g*(n+1);for(let m=0;m<n;m++){let p=m+_,v=p,x=p+n+1,M=p+n+2,R=p+1;a.push(v,x,R),a.push(x,M,R)}}this.setIndex(a),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ma(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ga extends Ht{constructor(t=new Vn([new H(0,0.5),new H(-0.5,-0.5),new H(0.5,-0.5)]),e=12){super();this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],i=[],s=[],r=[],a=0,o=0;if(Array.isArray(t)===!1)l(t);else for(let c=0;c<t.length;c++)l(t[c]),this.addGroup(a,o,c),a+=o,o=0;this.setIndex(n),this.setAttribute("position",new Mt(i,3)),this.setAttribute("normal",new Mt(s,3)),this.setAttribute("uv",new Mt(r,2));function l(c){let h=i.length/3,u=c.extractPoints(e),{shape:d,holes:f}=u;if(ln.isClockWise(d)===!1)d=d.reverse();for(let _=0,m=f.length;_<m;_++){let p=f[_];if(ln.isClockWise(p)===!0)f[_]=p.reverse()}let g=ln.triangulateShape(d,f);for(let _=0,m=f.length;_<m;_++){let p=f[_];d=d.concat(p)}for(let _=0,m=d.length;_<m;_++){let p=d[_];i.push(p.x,p.y,0),s.push(0,0,1),r.push(p.x,p.y)}for(let _=0,m=g.length;_<m;_++){let p=g[_],v=p[0]+h,x=p[1]+h,M=p[2]+h;n.push(v,x,M),o+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return C_(e,t)}static fromJSON(t,e){let n=[];for(let i=0,s=t.shapes.length;i<s;i++){let r=e[t.shapes[i]];n.push(r)}return new ga(n,t.curveSegments)}}function C_(t,e){if(e.shapes=[],Array.isArray(t))for(let n=0,i=t.length;n<i;n++){let s=t[n];e.shapes.push(s.uuid)}else e.shapes.push(t.uuid);return e}class qs extends Ht{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,r=0,a=Math.PI){super();this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let o=Math.min(r+a,Math.PI),l=0,c=[],h=new E,u=new E,d=[],f=[],g=[],_=[];for(let m=0;m<=n;m++){let p=[],v=m/n,x=0;if(m===0&&r===0)x=0.5/e;else if(m===n&&o===Math.PI)x=-0.5/e;for(let M=0;M<=e;M++){let R=M/e;h.x=-t*Math.cos(i+R*s)*Math.sin(r+v*a),h.y=t*Math.cos(r+v*a),h.z=t*Math.sin(i+R*s)*Math.sin(r+v*a),f.push(h.x,h.y,h.z),u.copy(h).normalize(),g.push(u.x,u.y,u.z),_.push(R+x,1-v),p.push(l++)}c.push(p)}for(let m=0;m<n;m++)for(let p=0;p<e;p++){let v=c[m][p+1],x=c[m][p],M=c[m+1][p],R=c[m+1][p+1];if(m!==0||r>0)d.push(v,x,R);if(m!==n-1||o<Math.PI)d.push(x,M,R)}this.setIndex(d),this.setAttribute("position",new Mt(f,3)),this.setAttribute("normal",new Mt(g,3)),this.setAttribute("uv",new Mt(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _a extends Zn{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e);this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _a(t.radius,t.detail)}}class xa extends Ht{constructor(t=1,e=0.4,n=12,i=48,s=Math.PI*2){super();this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let r=[],a=[],o=[],l=[],c=new E,h=new E,u=new E;for(let d=0;d<=n;d++)for(let f=0;f<=i;f++){let g=f/i*s,_=d/n*Math.PI*2;h.x=(t+e*Math.cos(_))*Math.cos(g),h.y=(t+e*Math.cos(_))*Math.sin(g),h.z=e*Math.sin(_),a.push(h.x,h.y,h.z),c.x=t*Math.cos(g),c.y=t*Math.sin(g),u.subVectors(h,c).normalize(),o.push(u.x,u.y,u.z),l.push(f/i),l.push(d/n)}for(let d=1;d<=n;d++)for(let f=1;f<=i;f++){let g=(i+1)*d+f-1,_=(i+1)*(d-1)+f-1,m=(i+1)*(d-1)+f,p=(i+1)*d+f;r.push(g,_,p),r.push(_,m,p)}this.setIndex(r),this.setAttribute("position",new Mt(a,3)),this.setAttribute("normal",new Mt(o,3)),this.setAttribute("uv",new Mt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class va extends Ht{constructor(t=1,e=0.4,n=64,i=8,s=2,r=3){super();this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:s,q:r},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new E,u=new E,d=new E,f=new E,g=new E,_=new E,m=new E;for(let v=0;v<=n;++v){let x=v/n*s*Math.PI*2;p(x,s,r,t,d),p(x+0.01,s,r,t,f),_.subVectors(f,d),m.addVectors(f,d),g.crossVectors(_,m),m.crossVectors(g,_),g.normalize(),m.normalize();for(let M=0;M<=i;++M){let R=M/i*Math.PI*2,w=-e*Math.cos(R),A=e*Math.sin(R);h.x=d.x+(w*m.x+A*g.x),h.y=d.y+(w*m.y+A*g.y),h.z=d.z+(w*m.z+A*g.z),o.push(h.x,h.y,h.z),u.subVectors(h,d).normalize(),l.push(u.x,u.y,u.z),c.push(v/n),c.push(M/i)}}for(let v=1;v<=n;v++)for(let x=1;x<=i;x++){let M=(i+1)*(v-1)+(x-1),R=(i+1)*v+(x-1),w=(i+1)*v+x,A=(i+1)*(v-1)+x;a.push(M,R,A),a.push(R,w,A)}this.setIndex(a),this.setAttribute("position",new Mt(o,3)),this.setAttribute("normal",new Mt(l,3)),this.setAttribute("uv",new Mt(c,2));function p(v,x,M,R,w){let A=Math.cos(v),L=Math.sin(v),S=M/x*v,T=Math.cos(S);w.x=R*(2+T)*0.5*A,w.y=R*(2+T)*L*0.5,w.z=R*Math.sin(S)*0.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new va(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}}class ya extends Ht{constructor(t=new ha(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),e=64,n=1,i=8,s=!1){super();this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};let r=t.computeFrenetFrames(e,s);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;let a=new E,o=new E,l=new H,c=new E,h=[],u=[],d=[],f=[];g(),this.setIndex(f),this.setAttribute("position",new Mt(h,3)),this.setAttribute("normal",new Mt(u,3)),this.setAttribute("uv",new Mt(d,2));function g(){for(let v=0;v<e;v++)_(v);_(s===!1?e:0),p(),m()}function _(v){c=t.getPointAt(v/e,c);let x=r.normals[v],M=r.binormals[v];for(let R=0;R<=i;R++){let w=R/i*Math.PI*2,A=Math.sin(w),L=-Math.cos(w);o.x=L*x.x+A*M.x,o.y=L*x.y+A*M.y,o.z=L*x.z+A*M.z,o.normalize(),u.push(o.x,o.y,o.z),a.x=c.x+n*o.x,a.y=c.y+n*o.y,a.z=c.z+n*o.z,h.push(a.x,a.y,a.z)}}function m(){for(let v=1;v<=e;v++)for(let x=1;x<=i;x++){let M=(i+1)*(v-1)+(x-1),R=(i+1)*v+(x-1),w=(i+1)*v+x,A=(i+1)*(v-1)+x;f.push(M,R,A),f.push(R,w,A)}}function p(){for(let v=0;v<=e;v++)for(let x=0;x<=i;x++)l.x=v/e,l.y=x/i,d.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ya(new Eo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ll extends Ht{constructor(t=null){super();if(this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,i=new E,s=new E;if(t.index!==null){let r=t.attributes.position,{index:a,groups:o}=t;if(o.length===0)o=[{start:0,count:a.count,materialIndex:0}];for(let l=0,c=o.length;l<c;++l){let h=o[l],{start:u,count:d}=h;for(let f=u,g=u+d;f<g;f+=3)for(let _=0;_<3;_++){let m=a.getX(f+_),p=a.getX(f+(_+1)%3);if(i.fromBufferAttribute(r,m),s.fromBufferAttribute(r,p),Sf(i,s,n)===!0)e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z)}}}else{let r=t.attributes.position;for(let a=0,o=r.count/3;a<o;a++)for(let l=0;l<3;l++){let c=3*a+l,h=3*a+(l+1)%3;if(i.fromBufferAttribute(r,c),s.fromBufferAttribute(r,h),Sf(i,s,n)===!0)e.push(i.x,i.y,i.z),e.push(s.x,s.y,s.z)}}this.setAttribute("position",new Mt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Sf(t,e,n){let i=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`;if(n.has(i)===!0||n.has(s)===!0)return!1;else return n.add(i),n.add(s),!0}var bf=Object.freeze({__proto__:null,BoxGeometry:hi,CapsuleGeometry:sa,CircleGeometry:ra,ConeGeometry:Vs,CylinderGeometry:Gs,DodecahedronGeometry:aa,EdgesGeometry:Al,ExtrudeGeometry:da,IcosahedronGeometry:fa,LatheGeometry:pa,OctahedronGeometry:Xs,PlaneGeometry:Wi,PolyhedronGeometry:Zn,RingGeometry:ma,ShapeGeometry:ga,SphereGeometry:qs,TetrahedronGeometry:_a,TorusGeometry:xa,TorusKnotGeometry:va,TubeGeometry:ya,WireframeGeometry:Ll});class Ul extends Le{constructor(t){super();this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new dt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}}class Ys extends Se{constructor(t){super(t);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Ma extends Le{constructor(t){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nl extends Ma{constructor(t){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+0.4*e)/(1-0.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){if(this._anisotropy>0!==t>0)this.version++;this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){if(this._clearcoat>0!==t>0)this.version++;this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){if(this._iridescence>0!==t>0)this.version++;this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){if(this._dispersion>0!==t>0)this.version++;this._dispersion=t}get sheen(){return this._sheen}set sheen(t){if(this._sheen>0!==t>0)this.version++;this._sheen=t}get transmission(){return this._transmission}set transmission(t){if(this._transmission>0!==t>0)this.version++;this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Fl extends Le{constructor(t){super();this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new dt(16777215),this.specular=new dt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ol extends Le{constructor(t){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new dt(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}class Bl extends Le{constructor(t){super();this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class zl extends Le{constructor(t){super();this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Be,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sa extends Le{constructor(t){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ba extends Le{constructor(t){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class kl extends Le{constructor(t){super();this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new dt(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Hl extends Ue{constructor(t){super();this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}}function Ai(t,e){if(!t||t.constructor===e)return t;if(typeof e.BYTES_PER_ELEMENT==="number")return new e(t);return Array.prototype.slice.call(t)}function tm(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function em(t){function e(s,r){return t[s]-t[r]}let n=t.length,i=Array(n);for(let s=0;s!==n;++s)i[s]=s;return i.sort(e),i}function rh(t,e,n){let i=t.length,s=new t.constructor(i);for(let r=0,a=0;a!==i;++r){let o=n[r]*e;for(let l=0;l!==e;++l)s[a++]=t[o+l]}return s}function Su(t,e,n,i){let s=1,r=t[0];while(r!==void 0&&r[i]===void 0)r=t[s++];if(r===void 0)return;let a=r[i];if(a===void 0)return;if(Array.isArray(a))do{if(a=r[i],a!==void 0)e.push(r.time),n.push(...a);r=t[s++]}while(r!==void 0);else if(a.toArray!==void 0)do{if(a=r[i],a!==void 0)e.push(r.time),a.toArray(n,n.length);r=t[s++]}while(r!==void 0);else do{if(a=r[i],a!==void 0)e.push(r.time),n.push(a);r=t[s++]}while(r!==void 0)}function R_(t,e,n,i,s=30){let r=t.clone();r.name=e;let a=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){let g=c.times[f]*s;if(g<n||g>=i)continue;u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}if(u.length===0)continue;c.times=Ai(u,c.times.constructor),c.values=Ai(d,c.values.constructor),a.push(c)}r.tracks=a;let o=1/0;for(let l=0;l<r.tracks.length;++l)if(o>r.tracks[l].times[0])o=r.tracks[l].times[0];for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r}function P_(t,e=0,n=t,i=30){if(i<=0)i=30;let s=n.tracks.length,r=e/i;for(let a=0;a<s;++a){let o=n.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;let c=t.tracks.find(function(p){return p.name===o.name&&p.ValueTypeName===l});if(c===void 0)continue;let h=0,u=o.getValueSize();if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)h=u/3;let d=0,f=c.getValueSize();if(c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)d=f/3;let g=o.times.length-1,_;if(r<=o.times[0]){let p=h,v=u-h;_=o.values.slice(p,v)}else if(r>=o.times[g]){let p=g*u+h,v=p+u-h;_=o.values.slice(p,v)}else{let p=o.createInterpolant(),v=h,x=u-h;p.evaluate(r),_=p.resultBuffer.slice(v,x)}if(l==="quaternion")new Ee().fromArray(_).normalize().conjugate().toArray(_);let m=c.times.length;for(let p=0;p<m;++p){let v=p*f+d;if(l==="quaternion")Ee.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{let x=f-d*2;for(let M=0;M<x;++M)c.values[v+M]-=_[M]}}}return t.blendMode=2501,t}class bu{static convertArray(t,e){return Ai(t,e)}static isTypedArray(t){return tm(t)}static getKeyframeOrder(t){return em(t)}static sortedArray(t,e,n){return rh(t,e,n)}static flattenJSON(t,e,n,i){Su(t,e,n,i)}static subclip(t,e,n,i,s=30){return R_(t,e,n,i,s)}static makeClipAdditive(t,e=0,n=t,i=30){return P_(t,e,n,i)}}class Xi{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let r;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}r=e.length;break n}if(!(t>=s)){let a=e[1];if(t<a)n=2,s=a;for(let o=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=s,s=e[--n-1],t>=s)break e}r=n,n=0;break n}break t}while(n<r){let a=n+r>>>1;if(t<e[a])r=a;else n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let r=0;r!==i;++r)e[r]=n[s+r];return e}interpolate_(){throw Error("call to abstract method")}intervalChanged_(){}}class Gl extends Xi{constructor(t,e,n,i){super(t,e,n,i);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,r=t+1,a=i[s],o=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case 2401:s=t,a=2*e-n;break;case 2402:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case 2401:r=t,o=2*n-e;break;case 2402:r=1,o=n+i[1]-i[0];break;default:r=t-1,o=e}let l=(n-e)*0.5,c=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(o-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,d=this._weightNext,f=(n-e)/(i-e),g=f*f,_=g*f,m=-u*_+2*u*g-u*f,p=(1+u)*_+(-1.5-2*u)*g+(-0.5+u)*f+1,v=(-1-d)*_+(1.5+d)*g+0.5*f,x=d*_-d*g;for(let M=0;M!==a;++M)s[M]=m*r[c+M]+p*r[l+M]+v*r[o+M]+x*r[h+M];return s}}class Ta extends Xi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=(n-e)/(i-e),h=1-c;for(let u=0;u!==a;++u)s[u]=r[l+u]*h+r[o+u]*c;return s}}class Vl extends Xi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class Je{constructor(t,e,n,i){if(t===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ai(e,this.TimeBufferType),this.values=Ai(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ai(t.times,Array),values:Ai(t.values,Array)};let i=t.getInterpolation();if(i!==t.DefaultInterpolation)n.interpolation=i}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Vl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ta(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case 2300:e=this.InterpolantFactoryMethodDiscrete;break;case 2301:e=this.InterpolantFactoryMethodLinear;break;case 2302:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,r=i-1;while(s!==i&&n[s]<t)++s;while(r!==-1&&n[r]>e)--r;if(++r,s!==0||r!==i){if(s>=r)r=Math.max(r,1),s=r-1;let a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let t=!0,e=this.getValueSize();if(e-Math.floor(e)!==0)console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1;let n=this.times,i=this.values,s=n.length;if(s===0)console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1;let r=null;for(let a=0;a!==s;a++){let o=n[a];if(typeof o==="number"&&isNaN(o)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,o),t=!1;break}if(r!==null&&r>o){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,o,r),t=!1;break}r=o}if(i!==void 0){if(tm(i))for(let a=0,o=i.length;a!==o;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===2302,s=t.length-1,r=1;for(let a=1;a<s;++a){let o=!1,l=t[a],c=t[a+1];if(l!==c&&(a!==1||l!==t[0]))if(!i){let h=a*n,u=h-n,d=h+n;for(let f=0;f!==n;++f){let g=e[h+f];if(g!==e[u+f]||g!==e[d+f]){o=!0;break}}}else o=!0;if(o){if(a!==r){t[r]=t[a];let h=a*n,u=r*n;for(let d=0;d!==n;++d)e[u+d]=e[h+d]}++r}}if(s>0){t[r]=t[s];for(let a=s*n,o=r*n,l=0;l!==n;++l)e[o+l]=e[a+l];++r}if(r!==t.length)this.times=t.slice(0,r),this.values=e.slice(0,r*n);else this.times=t,this.values=e;return this}clone(){let t=this.times.slice(),e=this.values.slice(),i=new this.constructor(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}Je.prototype.ValueTypeName="";Je.prototype.TimeBufferType=Float32Array;Je.prototype.ValueBufferType=Float32Array;Je.prototype.DefaultInterpolation=2301;class Jn extends Je{constructor(t,e,n){super(t,e,n)}}Jn.prototype.ValueTypeName="bool";Jn.prototype.ValueBufferType=Array;Jn.prototype.DefaultInterpolation=2300;Jn.prototype.InterpolantFactoryMethodLinear=void 0;Jn.prototype.InterpolantFactoryMethodSmooth=void 0;class Ea extends Je{constructor(t,e,n,i){super(t,e,n,i)}}Ea.prototype.ValueTypeName="color";class Ii extends Je{constructor(t,e,n,i){super(t,e,n,i)}}Ii.prototype.ValueTypeName="number";class Wl extends Xi{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=(n-e)/(i-e),l=t*a;for(let c=l+a;l!==c;l+=4)Ee.slerpFlat(s,0,r,l-a,r,l,o);return s}}class qi extends Je{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Wl(this.times,this.values,this.getValueSize(),t)}}qi.prototype.ValueTypeName="quaternion";qi.prototype.InterpolantFactoryMethodSmooth=void 0;class $n extends Je{constructor(t,e,n){super(t,e,n)}}$n.prototype.ValueTypeName="string";$n.prototype.ValueBufferType=Array;$n.prototype.DefaultInterpolation=2300;$n.prototype.InterpolantFactoryMethodLinear=void 0;$n.prototype.InterpolantFactoryMethodSmooth=void 0;class Di extends Je{constructor(t,e,n,i){super(t,e,n,i)}}Di.prototype.ValueTypeName="vector";class Li{constructor(t="",e=-1,n=[],i=2500){if(this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=en(),this.userData={},this.duration<0)this.resetDuration()}static parse(t){let e=[],n=t.tracks,i=1/(t.fps||1);for(let r=0,a=n.length;r!==a;++r)e.push(D_(n[r]).scale(i));let s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s.userData=JSON.parse(t.userData||"{}"),s}static toJSON(t){let e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let s=0,r=n.length;s!==r;++s)e.push(Je.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){let s=e.length,r=[];for(let a=0;a<s;a++){let o=[],l=[];o.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);let c=em(o);if(o=rh(o,1,c),l=rh(l,1,c),!i&&o[0]===0)o.push(s),l.push(l[0]);r.push(new Ii(".morphTargetInfluences["+e[a].name+"]",o,l).scale(1/n))}return new this(t,-1,r)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,o=t.length;a<o;a++){let l=t[a],c=l.name.match(s);if(c&&c.length>1){let h=c[1],u=i[h];if(!u)i[h]=u=[];u.push(l)}}let r=[];for(let a in i)r.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return r}static parseAnimation(t,e){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,f,g){if(d.length!==0){let _=[],m=[];if(Su(d,_,m,f),_.length!==0)g.push(new h(u,_,m))}},i=[],s=t.name||"default",r=t.fps||30,a=t.blendMode,o=t.length||-1,l=t.hierarchy||[];for(let h=0;h<l.length;h++){let u=l[h].keys;if(!u||u.length===0)continue;if(u[0].morphTargets){let d={},f;for(f=0;f<u.length;f++)if(u[f].morphTargets)for(let g=0;g<u[f].morphTargets.length;g++)d[u[f].morphTargets[g]]=-1;for(let g in d){let _=[],m=[];for(let p=0;p!==u[f].morphTargets.length;++p){let v=u[f];_.push(v.time),m.push(v.morphTarget===g?1:0)}i.push(new Ii(".morphTargetInfluence["+g+"]",_,m))}o=d.length*r}else{let d=".bones["+e[h].name+"]";n(Di,d+".position",u,"pos",i),n(qi,d+".quaternion",u,"rot",i),n(Di,d+".scale",u,"scl",i)}}if(i.length===0)return null;return new this(s,o,i,a)}resetDuration(){let t=this.tracks,e=0;for(let n=0,i=t.length;n!==i;++n){let s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}}function I_(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ii;case"vector":case"vector2":case"vector3":case"vector4":return Di;case"color":return Ea;case"quaternion":return qi;case"bool":case"boolean":return Jn;case"string":return $n}throw Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}function D_(t){if(t.type===void 0)throw Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=I_(t.type);if(t.times===void 0){let n=[],i=[];Su(t.keys,n,i,"value"),t.times=n,t.values=i}if(e.parse!==void 0)return e.parse(t);else return new e(t.name,t.times,t.values,t.interpolation)}var xn={enabled:!1,files:{},add:function(t,e){if(this.enabled===!1)return;this.files[t]=e},get:function(t){if(this.enabled===!1)return;return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class wa{constructor(t,e,n){let i=this,s=!1,r=0,a=0,o=void 0,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(c){if(a++,s===!1){if(i.onStart!==void 0)i.onStart(c,r,a)}s=!0},this.itemEnd=function(c){if(r++,i.onProgress!==void 0)i.onProgress(c,r,a);if(r===a){if(s=!1,i.onLoad!==void 0)i.onLoad()}},this.itemError=function(c){if(i.onError!==void 0)i.onError(c)},this.resolveURL=function(c){if(o)return o(c);return c},this.setURLModifier=function(c){return o=c,this},this.addHandler=function(c,h){return l.push(c,h),this},this.removeHandler=function(c){let h=l.indexOf(c);if(h!==-1)l.splice(h,2);return this},this.getHandler=function(c){for(let h=0,u=l.length;h<u;h+=2){let d=l[h],f=l[h+1];if(d.global)d.lastIndex=0;if(d.test(c))return f}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}var Tu=new wa;class ke{constructor(t){this.manager=t!==void 0?t:Tu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}ke.DEFAULT_MATERIAL_NAME="__DEFAULT";var kn={};class nm extends Error{constructor(t,e){super(t);this.response=e}}class vn extends ke{constructor(t){super(t);this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,i){if(t===void 0)t="";if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=xn.get(`file:${t}`);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{if(e)e(s);this.manager.itemEnd(t)},0),s;if(kn[t]!==void 0){kn[t].push({onLoad:e,onProgress:n,onError:i});return}kn[t]=[],kn[t].push({onLoad:e,onProgress:n,onError:i});let r=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,o=this.responseType;fetch(r).then((l)=>{if(l.status===200||l.status===0){if(l.status===0)console.warn("THREE.FileLoader: HTTP Status 0 received.");if(typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let c=kn[t],h=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=u?parseInt(u):0,f=d!==0,g=0,_=new ReadableStream({start(m){p();function p(){h.read().then(({done:v,value:x})=>{if(v)m.close();else{g+=x.byteLength;let M=new ProgressEvent("progress",{lengthComputable:f,loaded:g,total:d});for(let R=0,w=c.length;R<w;R++){let A=c[R];if(A.onProgress)A.onProgress(M)}m.enqueue(x),p()}},(v)=>{m.error(v)})}}});return new Response(_)}else throw new nm(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then((l)=>{switch(o){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then((c)=>new DOMParser().parseFromString(c,a));case"json":return l.json();default:if(a==="")return l.text();else{let h=/charset="?([^;"\s]*)"?/i.exec(a),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return l.arrayBuffer().then((f)=>d.decode(f))}}}).then((l)=>{xn.add(`file:${t}`,l);let c=kn[t];delete kn[t];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onLoad)d.onLoad(l)}}).catch((l)=>{let c=kn[t];if(c===void 0)throw this.manager.itemError(t),l;delete kn[t];for(let h=0,u=c.length;h<u;h++){let d=c[h];if(d.onError)d.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Eu extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=new vn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(o){if(i)i(o);else console.error(o);s.manager.itemError(t)}},n,i)}parse(t){let e=[];for(let n=0;n<t.length;n++){let i=Li.parse(t[n]);e.push(i)}return e}}class wu extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=[],a=new Hs,o=new vn(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(s.withCredentials);let l=0;function c(h){o.load(t[h],function(u){let d=s.parse(u,!0);if(r[h]={width:d.width,height:d.height,format:d.format,mipmaps:d.mipmaps},l+=1,l===6){if(d.mipmapCount===1)a.minFilter=1006;if(a.image=r,a.format=d.format,a.needsUpdate=!0,e)e(a)}},n,i)}if(Array.isArray(t))for(let h=0,u=t.length;h<u;++h)c(h);else o.load(t,function(h){let u=s.parse(h,!0);if(u.isCubemap){let d=u.mipmaps.length/u.mipmapCount;for(let f=0;f<d;f++){r[f]={mipmaps:[]};for(let g=0;g<u.mipmapCount;g++)r[f].mipmaps.push(u.mipmaps[f*u.mipmapCount+g]),r[f].format=u.format,r[f].width=u.width,r[f].height=u.height}a.image=r}else a.image.width=u.width,a.image.height=u.height,a.mipmaps=u.mipmaps;if(u.mipmapCount===1)a.minFilter=1006;if(a.format=u.format,a.needsUpdate=!0,e)e(a)},n,i);return a}}var xs=new WeakMap;class Ui extends ke{constructor(t){super(t)}load(t,e,n,i){if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=this,r=xn.get(`image:${t}`);if(r!==void 0){if(r.complete===!0)s.manager.itemStart(t),setTimeout(function(){if(e)e(r);s.manager.itemEnd(t)},0);else{let h=xs.get(r);if(h===void 0)h=[],xs.set(r,h);h.push({onLoad:e,onError:i})}return r}let a=bs("img");function o(){if(c(),e)e(this);let h=xs.get(this)||[];for(let u=0;u<h.length;u++){let d=h[u];if(d.onLoad)d.onLoad(this)}xs.delete(this),s.manager.itemEnd(t)}function l(h){if(c(),i)i(h);xn.remove(`image:${t}`);let u=xs.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];if(f.onError)f.onError(h)}xs.delete(this),s.manager.itemError(t),s.manager.itemEnd(t)}function c(){a.removeEventListener("load",o,!1),a.removeEventListener("error",l,!1)}if(a.addEventListener("load",o,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"){if(this.crossOrigin!==void 0)a.crossOrigin=this.crossOrigin}return xn.add(`image:${t}`,a),s.manager.itemStart(t),a.src=t,a}}class Au extends ke{constructor(t){super(t)}load(t,e,n,i){let s=new Vi;s.colorSpace="srgb";let r=new Ui(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);let a=0;function o(l){r.load(t[l],function(c){if(s.images[l]=c,a++,a===6){if(s.needsUpdate=!0,e)e(s)}},void 0,i)}for(let l=0;l<t.length;++l)o(l);return s}}class Cu extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=new cn,a=new vn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(s.withCredentials),a.load(t,function(o){let l;try{l=s.parse(o)}catch(c){if(i!==void 0)i(c);else{console.error(c);return}}if(l.image!==void 0)r.image=l.image;else if(l.data!==void 0)r.image.width=l.width,r.image.height=l.height,r.image.data=l.data;if(r.wrapS=l.wrapS!==void 0?l.wrapS:1001,r.wrapT=l.wrapT!==void 0?l.wrapT:1001,r.magFilter=l.magFilter!==void 0?l.magFilter:1006,r.minFilter=l.minFilter!==void 0?l.minFilter:1006,r.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0)r.colorSpace=l.colorSpace;if(l.flipY!==void 0)r.flipY=l.flipY;if(l.format!==void 0)r.format=l.format;if(l.type!==void 0)r.type=l.type;if(l.mipmaps!==void 0)r.mipmaps=l.mipmaps,r.minFilter=1008;if(l.mipmapCount===1)r.minFilter=1006;if(l.generateMipmaps!==void 0)r.generateMipmaps=l.generateMipmaps;if(r.needsUpdate=!0,e)e(r,l)},n,i),r}}class Ru extends ke{constructor(t){super(t)}load(t,e,n,i){let s=new xe,r=new Ui(this.manager);return r.setCrossOrigin(this.crossOrigin),r.setPath(this.path),r.load(t,function(a){if(s.image=a,s.needsUpdate=!0,e!==void 0)e(s)},n,i),s}}class Un extends ne{constructor(t,e=1){super();this.isLight=!0,this.type="Light",this.color=new dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);if(e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0)e.object.groundColor=this.groundColor.getHex();if(this.distance!==void 0)e.object.distance=this.distance;if(this.angle!==void 0)e.object.angle=this.angle;if(this.decay!==void 0)e.object.decay=this.decay;if(this.penumbra!==void 0)e.object.penumbra=this.penumbra;if(this.shadow!==void 0)e.object.shadow=this.shadow.toJSON();if(this.target!==void 0)e.object.target=this.target.uuid;return e}}class Xl extends Un{constructor(t,e,n){super(t,n);this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}var Jc=new Bt,Tf=new E,Ef=new E;class ql{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=1009,this.map=null,this.mapPass=null,this.matrix=new Bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ui,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;if(Tf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Tf),Ef.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ef),e.updateMatrixWorld(),Jc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc,e.coordinateSystem,e.reversedDepth),e.reversedDepth)n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,1,0,0,0,0,1);else n.set(0.5,0,0,0.5,0,0.5,0,0.5,0,0,0.5,0.5,0,0,0,1);n.multiply(Jc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){if(this.map)this.map.dispose();if(this.mapPass)this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};if(this.intensity!==1)t.intensity=this.intensity;if(this.bias!==0)t.bias=this.bias;if(this.normalBias!==0)t.normalBias=this.normalBias;if(this.radius!==1)t.radius=this.radius;if(this.mapSize.x!==512||this.mapSize.y!==512)t.mapSize=this.mapSize.toArray();return t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class im extends ql{constructor(){super(new Te(50,1,0.5,500));this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Ri*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far;if(n!==e.fov||i!==e.aspect||s!==e.far)e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix();super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Yl extends Un{constructor(t,e,n=0,i=Math.PI/3,s=0,r=2){super(t,e);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.target=new ne,this.distance=n,this.angle=i,this.penumbra=s,this.decay=r,this.map=null,this.shadow=new im}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}var wf=new Bt,pr=new E,$c=new E;class sm extends ql{constructor(){super(new Te(90,1,0.5,500));this.isPointLightShadow=!0,this._frameExtents=new H(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,i=this.matrix,s=t.distance||n.far;if(s!==n.far)n.far=s,n.updateProjectionMatrix();pr.setFromMatrixPosition(t.matrixWorld),n.position.copy(pr),$c.copy(n.position),$c.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt($c),n.updateMatrixWorld(),i.makeTranslation(-pr.x,-pr.y,-pr.z),wf.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wf,n.coordinateSystem,n.reversedDepth)}}class Zl extends Un{constructor(t,e,n=0,i=2){super(t,e);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new sm}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class di extends Bs{constructor(t=-1,e=1,n=1,i=-1,s=0.1,r=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,r){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-t,r=n+t,a=i+e,o=i-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,r=s+l*this.view.width,a-=c*this.view.offsetY,o=a-c*this.view.height}this.projectionMatrix.makeOrthographic(s,r,a,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);if(e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null)e.object.view=Object.assign({},this.view);return e}}class rm extends ql{constructor(){super(new di(-5,5,5,-5,0.5,500));this.isDirectionalLightShadow=!0}}class Jl extends Un{constructor(t,e){super(t,e);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ne.DEFAULT_UP),this.updateMatrix(),this.target=new ne,this.shadow=new rm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class $l extends Un{constructor(t,e){super(t,e);this.isAmbientLight=!0,this.type="AmbientLight"}}class Kl extends Un{constructor(t,e,n=10,i=10){super(t,e);this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){let e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}}class Ql{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new E)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){let{x:n,y:i,z:s}=t,r=this.coefficients;return e.copy(r[0]).multiplyScalar(0.282095),e.addScaledVector(r[1],0.488603*i),e.addScaledVector(r[2],0.488603*s),e.addScaledVector(r[3],0.488603*n),e.addScaledVector(r[4],1.092548*(n*i)),e.addScaledVector(r[5],1.092548*(i*s)),e.addScaledVector(r[6],0.315392*(3*s*s-1)),e.addScaledVector(r[7],1.092548*(n*s)),e.addScaledVector(r[8],0.546274*(n*n-i*i)),e}getIrradianceAt(t,e){let{x:n,y:i,z:s}=t,r=this.coefficients;return e.copy(r[0]).multiplyScalar(0.886227),e.addScaledVector(r[1],1.023328*i),e.addScaledVector(r[2],1.023328*s),e.addScaledVector(r[3],1.023328*n),e.addScaledVector(r[4],0.858086*n*i),e.addScaledVector(r[5],0.858086*i*s),e.addScaledVector(r[6],0.743125*s*s-0.247708),e.addScaledVector(r[7],0.858086*n*s),e.addScaledVector(r[8],0.429043*(n*n-i*i)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(t,e+i*3);return this}toArray(t=[],e=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(t,e+i*3);return t}static getBasisAt(t,e){let{x:n,y:i,z:s}=t;e[0]=0.282095,e[1]=0.488603*i,e[2]=0.488603*s,e[3]=0.488603*n,e[4]=1.092548*n*i,e[5]=1.092548*i*s,e[6]=0.315392*(3*s*s-1),e[7]=1.092548*n*s,e[8]=0.546274*(n*n-i*i)}}class jl extends Un{constructor(t=new Ql,e=1){super(void 0,e);this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}fromJSON(t){return this.intensity=t.intensity,this.sh.fromArray(t.sh),this}toJSON(t){let e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}}class Aa extends ke{constructor(t){super(t);this.textures={}}load(t,e,n,i){let s=this,r=new vn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(o){if(i)i(o);else console.error(o);s.manager.itemError(t)}},n,i)}parse(t){let e=this.textures;function n(s){if(e[s]===void 0)console.warn("THREE.MaterialLoader: Undefined texture",s);return e[s]}let i=this.createMaterialFromType(t.type);if(t.uuid!==void 0)i.uuid=t.uuid;if(t.name!==void 0)i.name=t.name;if(t.color!==void 0&&i.color!==void 0)i.color.setHex(t.color);if(t.roughness!==void 0)i.roughness=t.roughness;if(t.metalness!==void 0)i.metalness=t.metalness;if(t.sheen!==void 0)i.sheen=t.sheen;if(t.sheenColor!==void 0)i.sheenColor=new dt().setHex(t.sheenColor);if(t.sheenRoughness!==void 0)i.sheenRoughness=t.sheenRoughness;if(t.emissive!==void 0&&i.emissive!==void 0)i.emissive.setHex(t.emissive);if(t.specular!==void 0&&i.specular!==void 0)i.specular.setHex(t.specular);if(t.specularIntensity!==void 0)i.specularIntensity=t.specularIntensity;if(t.specularColor!==void 0&&i.specularColor!==void 0)i.specularColor.setHex(t.specularColor);if(t.shininess!==void 0)i.shininess=t.shininess;if(t.clearcoat!==void 0)i.clearcoat=t.clearcoat;if(t.clearcoatRoughness!==void 0)i.clearcoatRoughness=t.clearcoatRoughness;if(t.dispersion!==void 0)i.dispersion=t.dispersion;if(t.iridescence!==void 0)i.iridescence=t.iridescence;if(t.iridescenceIOR!==void 0)i.iridescenceIOR=t.iridescenceIOR;if(t.iridescenceThicknessRange!==void 0)i.iridescenceThicknessRange=t.iridescenceThicknessRange;if(t.transmission!==void 0)i.transmission=t.transmission;if(t.thickness!==void 0)i.thickness=t.thickness;if(t.attenuationDistance!==void 0)i.attenuationDistance=t.attenuationDistance;if(t.attenuationColor!==void 0&&i.attenuationColor!==void 0)i.attenuationColor.setHex(t.attenuationColor);if(t.anisotropy!==void 0)i.anisotropy=t.anisotropy;if(t.anisotropyRotation!==void 0)i.anisotropyRotation=t.anisotropyRotation;if(t.fog!==void 0)i.fog=t.fog;if(t.flatShading!==void 0)i.flatShading=t.flatShading;if(t.blending!==void 0)i.blending=t.blending;if(t.combine!==void 0)i.combine=t.combine;if(t.side!==void 0)i.side=t.side;if(t.shadowSide!==void 0)i.shadowSide=t.shadowSide;if(t.opacity!==void 0)i.opacity=t.opacity;if(t.transparent!==void 0)i.transparent=t.transparent;if(t.alphaTest!==void 0)i.alphaTest=t.alphaTest;if(t.alphaHash!==void 0)i.alphaHash=t.alphaHash;if(t.depthFunc!==void 0)i.depthFunc=t.depthFunc;if(t.depthTest!==void 0)i.depthTest=t.depthTest;if(t.depthWrite!==void 0)i.depthWrite=t.depthWrite;if(t.colorWrite!==void 0)i.colorWrite=t.colorWrite;if(t.blendSrc!==void 0)i.blendSrc=t.blendSrc;if(t.blendDst!==void 0)i.blendDst=t.blendDst;if(t.blendEquation!==void 0)i.blendEquation=t.blendEquation;if(t.blendSrcAlpha!==void 0)i.blendSrcAlpha=t.blendSrcAlpha;if(t.blendDstAlpha!==void 0)i.blendDstAlpha=t.blendDstAlpha;if(t.blendEquationAlpha!==void 0)i.blendEquationAlpha=t.blendEquationAlpha;if(t.blendColor!==void 0&&i.blendColor!==void 0)i.blendColor.setHex(t.blendColor);if(t.blendAlpha!==void 0)i.blendAlpha=t.blendAlpha;if(t.stencilWriteMask!==void 0)i.stencilWriteMask=t.stencilWriteMask;if(t.stencilFunc!==void 0)i.stencilFunc=t.stencilFunc;if(t.stencilRef!==void 0)i.stencilRef=t.stencilRef;if(t.stencilFuncMask!==void 0)i.stencilFuncMask=t.stencilFuncMask;if(t.stencilFail!==void 0)i.stencilFail=t.stencilFail;if(t.stencilZFail!==void 0)i.stencilZFail=t.stencilZFail;if(t.stencilZPass!==void 0)i.stencilZPass=t.stencilZPass;if(t.stencilWrite!==void 0)i.stencilWrite=t.stencilWrite;if(t.wireframe!==void 0)i.wireframe=t.wireframe;if(t.wireframeLinewidth!==void 0)i.wireframeLinewidth=t.wireframeLinewidth;if(t.wireframeLinecap!==void 0)i.wireframeLinecap=t.wireframeLinecap;if(t.wireframeLinejoin!==void 0)i.wireframeLinejoin=t.wireframeLinejoin;if(t.rotation!==void 0)i.rotation=t.rotation;if(t.linewidth!==void 0)i.linewidth=t.linewidth;if(t.dashSize!==void 0)i.dashSize=t.dashSize;if(t.gapSize!==void 0)i.gapSize=t.gapSize;if(t.scale!==void 0)i.scale=t.scale;if(t.polygonOffset!==void 0)i.polygonOffset=t.polygonOffset;if(t.polygonOffsetFactor!==void 0)i.polygonOffsetFactor=t.polygonOffsetFactor;if(t.polygonOffsetUnits!==void 0)i.polygonOffsetUnits=t.polygonOffsetUnits;if(t.dithering!==void 0)i.dithering=t.dithering;if(t.alphaToCoverage!==void 0)i.alphaToCoverage=t.alphaToCoverage;if(t.premultipliedAlpha!==void 0)i.premultipliedAlpha=t.premultipliedAlpha;if(t.forceSinglePass!==void 0)i.forceSinglePass=t.forceSinglePass;if(t.visible!==void 0)i.visible=t.visible;if(t.toneMapped!==void 0)i.toneMapped=t.toneMapped;if(t.userData!==void 0)i.userData=t.userData;if(t.vertexColors!==void 0)if(typeof t.vertexColors==="number")i.vertexColors=t.vertexColors>0?!0:!1;else i.vertexColors=t.vertexColors;if(t.uniforms!==void 0)for(let s in t.uniforms){let r=t.uniforms[s];switch(i.uniforms[s]={},r.type){case"t":i.uniforms[s].value=n(r.value);break;case"c":i.uniforms[s].value=new dt().setHex(r.value);break;case"v2":i.uniforms[s].value=new H().fromArray(r.value);break;case"v3":i.uniforms[s].value=new E().fromArray(r.value);break;case"v4":i.uniforms[s].value=new ee().fromArray(r.value);break;case"m3":i.uniforms[s].value=new Vt().fromArray(r.value);break;case"m4":i.uniforms[s].value=new Bt().fromArray(r.value);break;default:i.uniforms[s].value=r.value}}if(t.defines!==void 0)i.defines=t.defines;if(t.vertexShader!==void 0)i.vertexShader=t.vertexShader;if(t.fragmentShader!==void 0)i.fragmentShader=t.fragmentShader;if(t.glslVersion!==void 0)i.glslVersion=t.glslVersion;if(t.extensions!==void 0)for(let s in t.extensions)i.extensions[s]=t.extensions[s];if(t.lights!==void 0)i.lights=t.lights;if(t.clipping!==void 0)i.clipping=t.clipping;if(t.size!==void 0)i.size=t.size;if(t.sizeAttenuation!==void 0)i.sizeAttenuation=t.sizeAttenuation;if(t.map!==void 0)i.map=n(t.map);if(t.matcap!==void 0)i.matcap=n(t.matcap);if(t.alphaMap!==void 0)i.alphaMap=n(t.alphaMap);if(t.bumpMap!==void 0)i.bumpMap=n(t.bumpMap);if(t.bumpScale!==void 0)i.bumpScale=t.bumpScale;if(t.normalMap!==void 0)i.normalMap=n(t.normalMap);if(t.normalMapType!==void 0)i.normalMapType=t.normalMapType;if(t.normalScale!==void 0){let s=t.normalScale;if(Array.isArray(s)===!1)s=[s,s];i.normalScale=new H().fromArray(s)}if(t.displacementMap!==void 0)i.displacementMap=n(t.displacementMap);if(t.displacementScale!==void 0)i.displacementScale=t.displacementScale;if(t.displacementBias!==void 0)i.displacementBias=t.displacementBias;if(t.roughnessMap!==void 0)i.roughnessMap=n(t.roughnessMap);if(t.metalnessMap!==void 0)i.metalnessMap=n(t.metalnessMap);if(t.emissiveMap!==void 0)i.emissiveMap=n(t.emissiveMap);if(t.emissiveIntensity!==void 0)i.emissiveIntensity=t.emissiveIntensity;if(t.specularMap!==void 0)i.specularMap=n(t.specularMap);if(t.specularIntensityMap!==void 0)i.specularIntensityMap=n(t.specularIntensityMap);if(t.specularColorMap!==void 0)i.specularColorMap=n(t.specularColorMap);if(t.envMap!==void 0)i.envMap=n(t.envMap);if(t.envMapRotation!==void 0)i.envMapRotation.fromArray(t.envMapRotation);if(t.envMapIntensity!==void 0)i.envMapIntensity=t.envMapIntensity;if(t.reflectivity!==void 0)i.reflectivity=t.reflectivity;if(t.refractionRatio!==void 0)i.refractionRatio=t.refractionRatio;if(t.lightMap!==void 0)i.lightMap=n(t.lightMap);if(t.lightMapIntensity!==void 0)i.lightMapIntensity=t.lightMapIntensity;if(t.aoMap!==void 0)i.aoMap=n(t.aoMap);if(t.aoMapIntensity!==void 0)i.aoMapIntensity=t.aoMapIntensity;if(t.gradientMap!==void 0)i.gradientMap=n(t.gradientMap);if(t.clearcoatMap!==void 0)i.clearcoatMap=n(t.clearcoatMap);if(t.clearcoatRoughnessMap!==void 0)i.clearcoatRoughnessMap=n(t.clearcoatRoughnessMap);if(t.clearcoatNormalMap!==void 0)i.clearcoatNormalMap=n(t.clearcoatNormalMap);if(t.clearcoatNormalScale!==void 0)i.clearcoatNormalScale=new H().fromArray(t.clearcoatNormalScale);if(t.iridescenceMap!==void 0)i.iridescenceMap=n(t.iridescenceMap);if(t.iridescenceThicknessMap!==void 0)i.iridescenceThicknessMap=n(t.iridescenceThicknessMap);if(t.transmissionMap!==void 0)i.transmissionMap=n(t.transmissionMap);if(t.thicknessMap!==void 0)i.thicknessMap=n(t.thicknessMap);if(t.anisotropyMap!==void 0)i.anisotropyMap=n(t.anisotropyMap);if(t.sheenColorMap!==void 0)i.sheenColorMap=n(t.sheenColorMap);if(t.sheenRoughnessMap!==void 0)i.sheenRoughnessMap=n(t.sheenRoughnessMap);return i}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return Aa.createMaterialFromType(t)}static createMaterialFromType(t){return new{ShadowMaterial:Ul,SpriteMaterial:Kr,RawShaderMaterial:Ys,ShaderMaterial:Se,PointsMaterial:ea,MeshPhysicalMaterial:Nl,MeshStandardMaterial:Ma,MeshPhongMaterial:Fl,MeshToonMaterial:Ol,MeshNormalMaterial:Bl,MeshLambertMaterial:zl,MeshDepthMaterial:Sa,MeshDistanceMaterial:ba,MeshBasicMaterial:dn,MeshMatcapMaterial:kl,LineDashedMaterial:Hl,LineBasicMaterial:Ue,Material:Le}[t]}}class br{static extractUrlBase(t){let e=t.lastIndexOf("/");if(e===-1)return"./";return t.slice(0,e+1)}static resolveURL(t,e){if(typeof t!=="string"||t==="")return"";if(/^https?:\/\//i.test(e)&&/^\//.test(t))e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1");if(/^(https?:)?\/\//i.test(t))return t;if(/^data:.*,.*$/i.test(t))return t;if(/^blob:.*$/i.test(t))return t;return e+t}}class tc extends Ht{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class ec extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=new vn(s.manager);r.setPath(s.path),r.setRequestHeader(s.requestHeader),r.setWithCredentials(s.withCredentials),r.load(t,function(a){try{e(s.parse(JSON.parse(a)))}catch(o){if(i)i(o);else console.error(o);s.manager.itemError(t)}},n,i)}parse(t){let e={},n={};function i(d,f){if(e[f]!==void 0)return e[f];let _=d.interleavedBuffers[f],m=s(d,_.buffer),p=Ms(_.type,m),v=new ks(p,_.stride);return v.uuid=_.uuid,e[f]=v,v}function s(d,f){if(n[f]!==void 0)return n[f];let _=d.arrayBuffers[f],m=new Uint32Array(_).buffer;return n[f]=m,m}let r=t.isInstancedBufferGeometry?new tc:new Ht,a=t.data.index;if(a!==void 0){let d=Ms(a.type,a.array);r.setIndex(new se(d,1))}let o=t.data.attributes;for(let d in o){let f=o[d],g;if(f.isInterleavedBufferAttribute){let _=i(t.data,f.data);g=new ri(_,f.itemSize,f.offset,f.normalized)}else{let _=Ms(f.type,f.array);g=new(f.isInstancedBufferAttribute?ai:se)(_,f.itemSize,f.normalized)}if(f.name!==void 0)g.name=f.name;if(f.usage!==void 0)g.setUsage(f.usage);r.setAttribute(d,g)}let l=t.data.morphAttributes;if(l)for(let d in l){let f=l[d],g=[];for(let _=0,m=f.length;_<m;_++){let p=f[_],v;if(p.isInterleavedBufferAttribute){let x=i(t.data,p.data);v=new ri(x,p.itemSize,p.offset,p.normalized)}else{let x=Ms(p.type,p.array);v=new se(x,p.itemSize,p.normalized)}if(p.name!==void 0)v.name=p.name;g.push(v)}r.morphAttributes[d]=g}if(t.data.morphTargetsRelative)r.morphTargetsRelative=!0;let h=t.data.groups||t.data.drawcalls||t.data.offsets;if(h!==void 0)for(let d=0,f=h.length;d!==f;++d){let g=h[d];r.addGroup(g.start,g.count,g.materialIndex)}let u=t.data.boundingSphere;if(u!==void 0)r.boundingSphere=new we().fromJSON(u);if(t.name)r.name=t.name;if(t.userData)r.userData=t.userData;return r}}class Pu extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=this.path===""?br.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||r;let a=new vn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){let l=null;try{l=JSON.parse(o)}catch(h){if(i!==void 0)i(h);console.error("THREE:ObjectLoader: Can't parse "+t+".",h.message);return}let c=l.metadata;if(c===void 0||c.type===void 0||c.type.toLowerCase()==="geometry"){if(i!==void 0)i(Error("THREE.ObjectLoader: Can't load "+t));console.error("THREE.ObjectLoader: Can't load "+t);return}s.parse(l,e)},n,i)}async loadAsync(t,e){let n=this,i=this.path===""?br.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||i;let s=new vn(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials);let r=await s.loadAsync(t,e),a=JSON.parse(r),o=a.metadata;if(o===void 0||o.type===void 0||o.type.toLowerCase()==="geometry")throw Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){let n=this.parseAnimations(t.animations),i=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,i),r=this.parseImages(t.images,function(){if(e!==void 0)e(l)}),a=this.parseTextures(t.textures,r),o=this.parseMaterials(t.materials,a),l=this.parseObject(t.object,s,o,a,n),c=this.parseSkeletons(t.skeletons,l);if(this.bindSkeletons(l,c),this.bindLightTargets(l),e!==void 0){let h=!1;for(let u in r)if(r[u].data instanceof HTMLImageElement){h=!0;break}if(h===!1)e(l)}return l}async parseAsync(t){let e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),i=this.parseGeometries(t.geometries,n),s=await this.parseImagesAsync(t.images),r=this.parseTextures(t.textures,s),a=this.parseMaterials(t.materials,r),o=this.parseObject(t.object,i,a,r,e),l=this.parseSkeletons(t.skeletons,o);return this.bindSkeletons(o,l),this.bindLightTargets(o),o}parseShapes(t){let e={};if(t!==void 0)for(let n=0,i=t.length;n<i;n++){let s=new Vn().fromJSON(t[n]);e[s.uuid]=s}return e}parseSkeletons(t,e){let n={},i={};if(e.traverse(function(s){if(s.isBone)i[s.uuid]=s}),t!==void 0)for(let s=0,r=t.length;s<r;s++){let a=new jr().fromJSON(t[s],i);n[a.uuid]=a}return n}parseGeometries(t,e){let n={};if(t!==void 0){let i=new ec;for(let s=0,r=t.length;s<r;s++){let a,o=t[s];switch(o.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(o);break;default:if(o.type in bf)a=bf[o.type].fromJSON(o,e);else console.warn(`THREE.ObjectLoader: Unsupported geometry type "${o.type}"`)}if(a.uuid=o.uuid,o.name!==void 0)a.name=o.name;if(o.userData!==void 0)a.userData=o.userData;n[o.uuid]=a}}return n}parseMaterials(t,e){let n={},i={};if(t!==void 0){let s=new Aa;s.setTextures(e);for(let r=0,a=t.length;r<a;r++){let o=t[r];if(n[o.uuid]===void 0)n[o.uuid]=s.parse(o);i[o.uuid]=n[o.uuid]}}return i}parseAnimations(t){let e={};if(t!==void 0)for(let n=0;n<t.length;n++){let i=t[n],s=Li.parse(i);e[s.uuid]=s}return e}parseImages(t,e){let n=this,i={},s;function r(o){return n.manager.itemStart(o),s.load(o,function(){n.manager.itemEnd(o)},void 0,function(){n.manager.itemError(o),n.manager.itemEnd(o)})}function a(o){if(typeof o==="string"){let l=o,c=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l)?l:n.resourcePath+l;return r(c)}else if(o.data)return{data:Ms(o.type,o.data),width:o.width,height:o.height};else return null}if(t!==void 0&&t.length>0){let o=new wa(e);s=new Ui(o),s.setCrossOrigin(this.crossOrigin);for(let l=0,c=t.length;l<c;l++){let h=t[l],u=h.url;if(Array.isArray(u)){let d=[];for(let f=0,g=u.length;f<g;f++){let _=u[f],m=a(_);if(m!==null)if(m instanceof HTMLImageElement)d.push(m);else d.push(new cn(m.data,m.width,m.height))}i[h.uuid]=new Rn(d)}else{let d=a(h.url);i[h.uuid]=new Rn(d)}}}return i}async parseImagesAsync(t){let e=this,n={},i;async function s(r){if(typeof r==="string"){let a=r,o=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await i.loadAsync(o)}else if(r.data)return{data:Ms(r.type,r.data),width:r.width,height:r.height};else return null}if(t!==void 0&&t.length>0){i=new Ui(this.manager),i.setCrossOrigin(this.crossOrigin);for(let r=0,a=t.length;r<a;r++){let o=t[r],l=o.url;if(Array.isArray(l)){let c=[];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=await s(d);if(f!==null)if(f instanceof HTMLImageElement)c.push(f);else c.push(new cn(f.data,f.width,f.height))}n[o.uuid]=new Rn(c)}else{let c=await s(o.url);n[o.uuid]=new Rn(c)}}}return n}parseTextures(t,e){function n(s,r){if(typeof s==="number")return s;return console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",s),r[s]}let i={};if(t!==void 0)for(let s=0,r=t.length;s<r;s++){let a=t[s];if(a.image===void 0)console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid);if(e[a.image]===void 0)console.warn("THREE.ObjectLoader: Undefined image",a.image);let o=e[a.image],l=o.data,c;if(Array.isArray(l)){if(c=new Vi,l.length===6)c.needsUpdate=!0}else{if(l&&l.data)c=new cn;else c=new xe;if(l)c.needsUpdate=!0}if(c.source=o,c.uuid=a.uuid,a.name!==void 0)c.name=a.name;if(a.mapping!==void 0)c.mapping=n(a.mapping,L_);if(a.channel!==void 0)c.channel=a.channel;if(a.offset!==void 0)c.offset.fromArray(a.offset);if(a.repeat!==void 0)c.repeat.fromArray(a.repeat);if(a.center!==void 0)c.center.fromArray(a.center);if(a.rotation!==void 0)c.rotation=a.rotation;if(a.wrap!==void 0)c.wrapS=n(a.wrap[0],Af),c.wrapT=n(a.wrap[1],Af);if(a.format!==void 0)c.format=a.format;if(a.internalFormat!==void 0)c.internalFormat=a.internalFormat;if(a.type!==void 0)c.type=a.type;if(a.colorSpace!==void 0)c.colorSpace=a.colorSpace;if(a.minFilter!==void 0)c.minFilter=n(a.minFilter,Cf);if(a.magFilter!==void 0)c.magFilter=n(a.magFilter,Cf);if(a.anisotropy!==void 0)c.anisotropy=a.anisotropy;if(a.flipY!==void 0)c.flipY=a.flipY;if(a.generateMipmaps!==void 0)c.generateMipmaps=a.generateMipmaps;if(a.premultiplyAlpha!==void 0)c.premultiplyAlpha=a.premultiplyAlpha;if(a.unpackAlignment!==void 0)c.unpackAlignment=a.unpackAlignment;if(a.compareFunction!==void 0)c.compareFunction=a.compareFunction;if(a.userData!==void 0)c.userData=a.userData;i[a.uuid]=c}return i}parseObject(t,e,n,i,s){let r;function a(u){if(e[u]===void 0)console.warn("THREE.ObjectLoader: Undefined geometry",u);return e[u]}function o(u){if(u===void 0)return;if(Array.isArray(u)){let d=[];for(let f=0,g=u.length;f<g;f++){let _=u[f];if(n[_]===void 0)console.warn("THREE.ObjectLoader: Undefined material",_);d.push(n[_])}return d}if(n[u]===void 0)console.warn("THREE.ObjectLoader: Undefined material",u);return n[u]}function l(u){if(i[u]===void 0)console.warn("THREE.ObjectLoader: Undefined texture",u);return i[u]}let c,h;switch(t.type){case"Scene":if(r=new xl,t.background!==void 0)if(Number.isInteger(t.background))r.background=new dt(t.background);else r.background=l(t.background);if(t.environment!==void 0)r.environment=l(t.environment);if(t.fog!==void 0){if(t.fog.type==="Fog")r.fog=new $r(t.fog.color,t.fog.near,t.fog.far);else if(t.fog.type==="FogExp2")r.fog=new Jr(t.fog.color,t.fog.density);if(t.fog.name!=="")r.fog.name=t.fog.name}if(t.backgroundBlurriness!==void 0)r.backgroundBlurriness=t.backgroundBlurriness;if(t.backgroundIntensity!==void 0)r.backgroundIntensity=t.backgroundIntensity;if(t.backgroundRotation!==void 0)r.backgroundRotation.fromArray(t.backgroundRotation);if(t.environmentIntensity!==void 0)r.environmentIntensity=t.environmentIntensity;if(t.environmentRotation!==void 0)r.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":if(r=new Te(t.fov,t.aspect,t.near,t.far),t.focus!==void 0)r.focus=t.focus;if(t.zoom!==void 0)r.zoom=t.zoom;if(t.filmGauge!==void 0)r.filmGauge=t.filmGauge;if(t.filmOffset!==void 0)r.filmOffset=t.filmOffset;if(t.view!==void 0)r.view=Object.assign({},t.view);break;case"OrthographicCamera":if(r=new di(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0)r.zoom=t.zoom;if(t.view!==void 0)r.view=Object.assign({},t.view);break;case"AmbientLight":r=new $l(t.color,t.intensity);break;case"DirectionalLight":r=new Jl(t.color,t.intensity),r.target=t.target||"";break;case"PointLight":r=new Zl(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":r=new Kl(t.color,t.intensity,t.width,t.height);break;case"SpotLight":r=new Yl(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),r.target=t.target||"";break;case"HemisphereLight":r=new Xl(t.color,t.groundColor,t.intensity);break;case"LightProbe":r=new jl().fromJSON(t);break;case"SkinnedMesh":if(c=a(t.geometry),h=o(t.material),r=new Ml(c,h),t.bindMode!==void 0)r.bindMode=t.bindMode;if(t.bindMatrix!==void 0)r.bindMatrix.fromArray(t.bindMatrix);if(t.skeleton!==void 0)r.skeleton=t.skeleton;break;case"Mesh":c=a(t.geometry),h=o(t.material),r=new pe(c,h);break;case"InstancedMesh":c=a(t.geometry),h=o(t.material);let{count:u,instanceMatrix:d,instanceColor:f}=t;if(r=new Sl(c,h,u),r.instanceMatrix=new ai(new Float32Array(d.array),16),f!==void 0)r.instanceColor=new ai(new Float32Array(f.array),f.itemSize);break;case"BatchedMesh":if(c=a(t.geometry),h=o(t.material),r=new bl(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,h),r.geometry=c,r.perObjectFrustumCulled=t.perObjectFrustumCulled,r.sortObjects=t.sortObjects,r._drawRanges=t.drawRanges,r._reservedRanges=t.reservedRanges,r._geometryInfo=t.geometryInfo.map((g)=>{let _=null,m=null;if(g.boundingBox!==void 0)_=new Ie().fromJSON(g.boundingBox);if(g.boundingSphere!==void 0)m=new we().fromJSON(g.boundingSphere);return{...g,boundingBox:_,boundingSphere:m}}),r._instanceInfo=t.instanceInfo,r._availableInstanceIds=t._availableInstanceIds,r._availableGeometryIds=t._availableGeometryIds,r._nextIndexStart=t.nextIndexStart,r._nextVertexStart=t.nextVertexStart,r._geometryCount=t.geometryCount,r._maxInstanceCount=t.maxInstanceCount,r._maxVertexCount=t.maxVertexCount,r._maxIndexCount=t.maxIndexCount,r._geometryInitialized=t.geometryInitialized,r._matricesTexture=l(t.matricesTexture.uuid),r._indirectTexture=l(t.indirectTexture.uuid),t.colorsTexture!==void 0)r._colorsTexture=l(t.colorsTexture.uuid);if(t.boundingSphere!==void 0)r.boundingSphere=new we().fromJSON(t.boundingSphere);if(t.boundingBox!==void 0)r.boundingBox=new Ie().fromJSON(t.boundingBox);break;case"LOD":r=new yl;break;case"Line":r=new Pn(a(t.geometry),o(t.material));break;case"LineLoop":r=new Tl(a(t.geometry),o(t.material));break;case"LineSegments":r=new fn(a(t.geometry),o(t.material));break;case"PointCloud":case"Points":r=new El(a(t.geometry),o(t.material));break;case"Sprite":r=new vl(o(t.material));break;case"Group":r=new si;break;case"Bone":r=new Qr;break;default:r=new ne}if(r.uuid=t.uuid,t.name!==void 0)r.name=t.name;if(t.matrix!==void 0){if(r.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0)r.matrixAutoUpdate=t.matrixAutoUpdate;if(r.matrixAutoUpdate)r.matrix.decompose(r.position,r.quaternion,r.scale)}else{if(t.position!==void 0)r.position.fromArray(t.position);if(t.rotation!==void 0)r.rotation.fromArray(t.rotation);if(t.quaternion!==void 0)r.quaternion.fromArray(t.quaternion);if(t.scale!==void 0)r.scale.fromArray(t.scale)}if(t.up!==void 0)r.up.fromArray(t.up);if(t.castShadow!==void 0)r.castShadow=t.castShadow;if(t.receiveShadow!==void 0)r.receiveShadow=t.receiveShadow;if(t.shadow){if(t.shadow.intensity!==void 0)r.shadow.intensity=t.shadow.intensity;if(t.shadow.bias!==void 0)r.shadow.bias=t.shadow.bias;if(t.shadow.normalBias!==void 0)r.shadow.normalBias=t.shadow.normalBias;if(t.shadow.radius!==void 0)r.shadow.radius=t.shadow.radius;if(t.shadow.mapSize!==void 0)r.shadow.mapSize.fromArray(t.shadow.mapSize);if(t.shadow.camera!==void 0)r.shadow.camera=this.parseObject(t.shadow.camera)}if(t.visible!==void 0)r.visible=t.visible;if(t.frustumCulled!==void 0)r.frustumCulled=t.frustumCulled;if(t.renderOrder!==void 0)r.renderOrder=t.renderOrder;if(t.userData!==void 0)r.userData=t.userData;if(t.layers!==void 0)r.layers.mask=t.layers;if(t.children!==void 0){let u=t.children;for(let d=0;d<u.length;d++)r.add(this.parseObject(u[d],e,n,i,s))}if(t.animations!==void 0){let u=t.animations;for(let d=0;d<u.length;d++){let f=u[d];r.animations.push(s[f])}}if(t.type==="LOD"){if(t.autoUpdate!==void 0)r.autoUpdate=t.autoUpdate;let u=t.levels;for(let d=0;d<u.length;d++){let f=u[d],g=r.getObjectByProperty("uuid",f.object);if(g!==void 0)r.addLevel(g,f.distance,f.hysteresis)}}return r}bindSkeletons(t,e){if(Object.keys(e).length===0)return;t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=e[n.skeleton];if(i===void 0)console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton);else n.bind(i,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){let n=e.target,i=t.getObjectByProperty("uuid",n);if(i!==void 0)e.target=i;else e.target=new ne}})}}var L_={UVMapping:300,CubeReflectionMapping:301,CubeRefractionMapping:302,EquirectangularReflectionMapping:303,EquirectangularRefractionMapping:304,CubeUVReflectionMapping:306},Af={RepeatWrapping:1000,ClampToEdgeWrapping:1001,MirroredRepeatWrapping:1002},Cf={NearestFilter:1003,NearestMipmapNearestFilter:1004,NearestMipmapLinearFilter:1005,LinearFilter:1006,LinearMipmapNearestFilter:1007,LinearMipmapLinearFilter:1008},Kc=new WeakMap;class Iu extends ke{constructor(t){super(t);if(this.isImageBitmapLoader=!0,typeof createImageBitmap>"u")console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported.");if(typeof fetch>"u")console.warn("THREE.ImageBitmapLoader: fetch() not supported.");this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,i){if(t===void 0)t="";if(this.path!==void 0)t=this.path+t;t=this.manager.resolveURL(t);let s=this,r=xn.get(`image-bitmap:${t}`);if(r!==void 0){if(s.manager.itemStart(t),r.then){r.then((l)=>{if(Kc.has(r)===!0){if(i)i(Kc.get(r));s.manager.itemError(t),s.manager.itemEnd(t)}else{if(e)e(l);return s.manager.itemEnd(t),l}});return}return setTimeout(function(){if(e)e(r);s.manager.itemEnd(t)},0),r}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any==="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let o=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){if(xn.add(`image-bitmap:${t}`,l),e)e(l);return s.manager.itemEnd(t),l}).catch(function(l){if(i)i(l);Kc.set(o,l),xn.remove(`image-bitmap:${t}`),s.manager.itemError(t),s.manager.itemEnd(t)});xn.add(`image-bitmap:${t}`,o),s.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}var go;class Ca{static getContext(){if(go===void 0)go=new(window.AudioContext||window.webkitAudioContext);return go}static setContext(t){go=t}}class Du extends ke{constructor(t){super(t)}load(t,e,n,i){let s=this,r=new vn(this.manager);r.setResponseType("arraybuffer"),r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(t,function(o){try{let l=o.slice(0);Ca.getContext().decodeAudioData(l,function(h){e(h)}).catch(a)}catch(l){a(l)}},n,i);function a(o){if(i)i(o);else console.error(o);s.manager.itemError(t)}}}var Rf=new Bt,Pf=new Bt,Mi=new Bt;class Lu{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=0.064,this.cameraL=new Te,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Te,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){let e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,Mi.copy(t.projectionMatrix);let i=e.eyeSep/2,s=i*e.near/e.focus,r=e.near*Math.tan(Ci*e.fov*0.5)/e.zoom,a,o;Pf.elements[12]=-i,Rf.elements[12]=i,a=-r*e.aspect+s,o=r*e.aspect+s,Mi.elements[0]=2*e.near/(o-a),Mi.elements[8]=(o+a)/(o-a),this.cameraL.projectionMatrix.copy(Mi),a=-r*e.aspect-s,o=r*e.aspect-s,Mi.elements[0]=2*e.near/(o-a),Mi.elements[8]=(o+a)/(o-a),this.cameraR.projectionMatrix.copy(Mi)}this.cameraL.matrixWorld.copy(t.matrixWorld).multiply(Pf),this.cameraR.matrixWorld.copy(t.matrixWorld).multiply(Rf)}}class nc extends Te{constructor(t=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Zs{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1000,this.oldTime=e,this.elapsedTime+=t}return t}}var Si=new E,Qc=new Ee,U_=new E,bi=new E,Ti=new E;class Uu extends ne{constructor(){super();this.type="AudioListener",this.context=Ca.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Zs}getInput(){return this.gain}removeFilter(){if(this.filter!==null)this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null;return this}getFilter(){return this.filter}setFilter(t){if(this.filter!==null)this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination);else this.gain.disconnect(this.context.destination);return this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,0.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t);let e=this.context.listener;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(Si,Qc,U_),bi.set(0,0,-1).applyQuaternion(Qc),Ti.set(0,1,0).applyQuaternion(Qc),e.positionX){let n=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Si.x,n),e.positionY.linearRampToValueAtTime(Si.y,n),e.positionZ.linearRampToValueAtTime(Si.z,n),e.forwardX.linearRampToValueAtTime(bi.x,n),e.forwardY.linearRampToValueAtTime(bi.y,n),e.forwardZ.linearRampToValueAtTime(bi.z,n),e.upX.linearRampToValueAtTime(Ti.x,n),e.upY.linearRampToValueAtTime(Ti.y,n),e.upZ.linearRampToValueAtTime(Ti.z,n)}else e.setPosition(Si.x,Si.y,Si.z),e.setOrientation(bi.x,bi.y,bi.z,Ti.x,Ti.y,Ti.z)}}class ic extends ne{constructor(t){super();this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){if(this.buffer=t,this.sourceType="buffer",this.autoplay)this.play();return this}play(t=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;let e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.isPlaying===!0){if(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0)this._progress=this._progress%(this.duration||this.buffer.duration);this.source.stop(),this.source.onended=null,this.isPlaying=!1}return this}stop(t=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this._progress=0,this.source!==null)this.source.stop(this.context.currentTime+t),this.source.onended=null;return this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected===!1)return;if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(t){if(!t)t=[];if(this._connected===!0)this.disconnect(),this.filters=t.slice(),this.connect();else this.filters=t.slice();return this}setDetune(t){if(this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0)this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,0.01);return this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.playbackRate=t,this.isPlaying===!0)this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,0.01);return this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){if(this.hasPlaybackControl===!1)return console.warn("THREE.Audio: this Audio has no playback control."),!1;return this.loop}setLoop(t){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}if(this.loop=t,this.isPlaying===!0)this.source.loop=this.loop;return this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,0.01),this}copy(t,e){if(super.copy(t,e),t.sourceType!=="buffer")return console.warn("THREE.Audio: Audio source type cannot be copied."),this;return this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this}clone(t){return new this.constructor(this.listener).copy(this,t)}}var Ei=new E,If=new Ee,N_=new E,wi=new E;class Nu extends ic{constructor(t){super(t);this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ei,If,N_),wi.set(0,0,1).applyQuaternion(If);let e=this.panner;if(e.positionX){let n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Ei.x,n),e.positionY.linearRampToValueAtTime(Ei.y,n),e.positionZ.linearRampToValueAtTime(Ei.z,n),e.orientationX.linearRampToValueAtTime(wi.x,n),e.orientationY.linearRampToValueAtTime(wi.y,n),e.orientationZ.linearRampToValueAtTime(wi.z,n)}else e.setPosition(Ei.x,Ei.y,Ei.z),e.setOrientation(wi.x,wi.y,wi.z)}}class Fu{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0,e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}}class sc{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,r;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,r=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,r=this._setAdditiveIdentityOther,this.buffer=Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,r=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=r,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){let n=this.buffer,i=this.valueSize,s=t*i+i,r=this.cumulativeWeight;if(r===0){for(let a=0;a!==i;++a)n[s+a]=n[a];r=e}else{r+=e;let a=e/r;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=r}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,i=n*this._addIndex;if(this.cumulativeWeightAdditive===0)this._setIdentity();this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,r=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){let o=e*this._origIndex;this._mixBufferRegion(n,i,o,1-s,e)}if(r>0)this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let o=e,l=e+e;o!==l;++o)if(n[o]!==n[o+e]){a.setValue(n,i);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,r=i;s!==r;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=0.5)for(let r=0;r!==s;++r)t[e+r]=t[n+r]}_slerp(t,e,n,i){Ee.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){let r=this._workIndex*s;Ee.multiplyQuaternionsFlat(t,r,t,e,t,n),Ee.slerpFlat(t,e,t,e,t,r,i)}_lerp(t,e,n,i,s){let r=1-i;for(let a=0;a!==s;++a){let o=e+a;t[o]=t[o]*r+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let r=0;r!==s;++r){let a=e+r;t[a]=t[a]+t[n+r]*i}}}var Ou="\\[\\]\\.:\\/",F_=new RegExp("["+Ou+"]","g"),Bu="[^"+Ou+"]",O_="[^"+Ou.replace("\\.","")+"]",B_=/((?:WC+[\/:])*)/.source.replace("WC",Bu),z_=/(WCOD+)?/.source.replace("WCOD",O_),k_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bu),H_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bu),G_=new RegExp("^"+B_+z_+k_+H_+"$"),V_=["material","materials","bones","map"];class am{constructor(t,e,n){let i=n||te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];if(i!==void 0)i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class te{constructor(t,e,n){this.path=e,this.parsedPath=n||te.parseTrackName(e),this.node=te.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){if(!(t&&t.isAnimationObjectGroup))return new te(t,e,n);else return new te.Composite(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(F_,"")}static parseTrackName(t){let e=G_.exec(t);if(e===null)throw Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);if(V_.indexOf(s)!==-1)n.nodeName=n.nodeName.substring(0,i),n.objectName=s}if(n.propertyName===null||n.propertyName.length===0)throw Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let r=0;r<s.length;r++){let a=s[r];if(a.name===e||a.uuid===e)return a;let o=n(a.children);if(o)return o}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,{objectName:n,propertyName:i,propertyIndex:s}=e;if(!t)t=te.findNode(this.rootNode,e.nodeName),this.node=t;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let c=0;c<t.length;c++)if(t[c].name===l){l=c;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let r=t[i];if(r===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;if(this.targetObject=t,t.isMaterial===!0)a=this.Versioning.NeedsUpdate;else if(t.isObject3D===!0)a=this.Versioning.MatrixWorldNeedsUpdate;let o=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(t.morphTargetDictionary[s]!==void 0)s=t.morphTargetDictionary[s]}o=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else if(r.fromArray!==void 0&&r.toArray!==void 0)o=this.BindingType.HasFromToArray,this.resolvedProperty=r;else if(Array.isArray(r))o=this.BindingType.EntireArray,this.resolvedProperty=r;else this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}te.Composite=am;te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};te.prototype.GetterByBindingType=[te.prototype._getValue_direct,te.prototype._getValue_array,te.prototype._getValue_arrayElement,te.prototype._getValue_toArray];te.prototype.SetterByBindingTypeAndVersioning=[[te.prototype._setValue_direct,te.prototype._setValue_direct_setNeedsUpdate,te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[te.prototype._setValue_array,te.prototype._setValue_array_setNeedsUpdate,te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[te.prototype._setValue_arrayElement,te.prototype._setValue_arrayElement_setNeedsUpdate,te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[te.prototype._setValue_fromArray,te.prototype._setValue_fromArray_setNeedsUpdate,te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class zu{constructor(){this.isAnimationObjectGroup=!0,this.uuid=en(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let t={};this._indicesByUUID=t;for(let n=0,i=arguments.length;n!==i;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){let t=this._objects,e=this._indicesByUUID,n=this._paths,i=this._parsedPaths,s=this._bindings,r=s.length,a=void 0,o=t.length,l=this.nCachedObjects_;for(let c=0,h=arguments.length;c!==h;++c){let u=arguments[c],d=u.uuid,f=e[d];if(f===void 0){f=o++,e[d]=f,t.push(u);for(let g=0,_=r;g!==_;++g)s[g].push(new te(u,n[g],i[g]))}else if(f<l){a=t[f];let g=--l,_=t[g];e[_.uuid]=f,t[f]=_,e[d]=g,t[g]=u;for(let m=0,p=r;m!==p;++m){let v=s[m],x=v[g],M=v[f];if(v[f]=x,M===void 0)M=new te(u,n[m],i[m]);v[g]=M}}else if(t[f]!==a)console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=l}remove(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,s=this.nCachedObjects_;for(let r=0,a=arguments.length;r!==a;++r){let o=arguments[r],l=o.uuid,c=e[l];if(c!==void 0&&c>=s){let h=s++,u=t[h];e[u.uuid]=c,t[c]=u,e[l]=h,t[h]=o;for(let d=0,f=i;d!==f;++d){let g=n[d],_=g[h],m=g[c];g[c]=_,g[h]=m}}}this.nCachedObjects_=s}uncache(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,i=n.length,s=this.nCachedObjects_,r=t.length;for(let a=0,o=arguments.length;a!==o;++a){let l=arguments[a],c=l.uuid,h=e[c];if(h!==void 0)if(delete e[c],h<s){let u=--s,d=t[u],f=--r,g=t[f];e[d.uuid]=h,t[h]=d,e[g.uuid]=u,t[u]=g,t.pop();for(let _=0,m=i;_!==m;++_){let p=n[_],v=p[u],x=p[f];p[h]=v,p[u]=x,p.pop()}}else{let u=--r,d=t[u];if(u>0)e[d.uuid]=h;t[h]=d,t.pop();for(let f=0,g=i;f!==g;++f){let _=n[f];_[h]=_[u],_.pop()}}}this.nCachedObjects_=s}subscribe_(t,e){let n=this._bindingsIndicesByPath,i=n[t],s=this._bindings;if(i!==void 0)return s[i];let r=this._paths,a=this._parsedPaths,o=this._objects,l=o.length,c=this.nCachedObjects_,h=Array(l);i=s.length,n[t]=i,r.push(t),a.push(e),s.push(h);for(let u=c,d=o.length;u!==d;++u){let f=o[u];h[u]=new te(f,t,e)}return h}unsubscribe_(t){let e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){let i=this._paths,s=this._parsedPaths,r=this._bindings,a=r.length-1,o=r[a],l=t[a];e[l]=n,r[n]=o,r.pop(),s[n]=s[a],s.pop(),i[n]=i[a],i.pop()}}}class rc{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;let s=e.tracks,r=s.length,a=Array(r),o={endingStart:2400,endingEnd:2400};for(let l=0;l!==r;++l){let c=s[l].createInterpolant(null);a[l]=c,c.settings=o}this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=2201,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){let i=this._clip.duration,s=t._clip.duration,r=s/i,a=i/s;t.warp(1,r,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;if(t!==null)this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t);return this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let i=this._mixer,s=i.time,r=this.timeScale,a=this._timeScaleInterpolant;if(a===null)a=i._lendControlInterpolant(),this._timeScaleInterpolant=a;let o=a.parameterPositions,l=a.sampleValues;return o[0]=s,o[1]=s+n,l[0]=t/r,l[1]=e/r,this}stopWarping(){let t=this._timeScaleInterpolant;if(t!==null)this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t);return this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}let s=this._startTime;if(s!==null){let o=(t-s)*n;if(o<0||n===0)e=0;else this._startTime=null,e=n*o}e*=this._updateTimeScale(t);let r=this._updateTime(e),a=this._updateWeight(t);if(a>0){let o=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case 2501:for(let c=0,h=o.length;c!==h;++c)o[c].evaluate(r),l[c].accumulateAdditive(a);break;case 2500:default:for(let c=0,h=o.length;c!==h;++c)o[c].evaluate(r),l[c].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(t)[0];if(e*=i,t>n.parameterPositions[1]){if(this.stopFading(),i===0)this.enabled=!1}}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(t)[0];if(e*=i,t>n.parameterPositions[1])if(this.stopWarping(),e===0)this.paused=!0;else this.timeScale=e}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,i=this.time+t,s=this._loopCount,r=n===2202;if(t===0){if(s===-1)return i;return r&&(s&1)===1?e-i:i}if(n===2200){if(s===-1)this._loopCount=0,this._setEndings(!0,!0,!1);t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1)if(t>=0)s=0,this._setEndings(!0,this.repetitions===0,r);else this._setEndings(this.repetitions===0,!0,r);if(i>=e||i<0){let a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);let o=this.repetitions-s;if(o<=0){if(this.clampWhenFinished)this.paused=!0;else this.enabled=!1;i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1})}else{if(o===1){let l=t<0;this._setEndings(l,!l,r)}else this._setEndings(!1,!1,r);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(r&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){let i=this._interpolantSettings;if(n)i.endingStart=2401,i.endingEnd=2401;else{if(t)i.endingStart=this.zeroSlopeAtStart?2401:2400;else i.endingStart=2402;if(e)i.endingEnd=this.zeroSlopeAtEnd?2401:2400;else i.endingEnd=2402}}_scheduleFading(t,e,n){let i=this._mixer,s=i.time,r=this._weightInterpolant;if(r===null)r=i._lendControlInterpolant(),this._weightInterpolant=r;let a=r.parameterPositions,o=r.sampleValues;return a[0]=s,o[0]=e,a[1]=s+t,o[1]=n,this}}var W_=new Float32Array(1);class ku extends un{constructor(t){super();this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){let n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,{_propertyBindings:r,_interpolants:a}=t,o=n.uuid,l=this._bindingsByRootAndName,c=l[o];if(c===void 0)c={},l[o]=c;for(let h=0;h!==s;++h){let u=i[h],d=u.name,f=c[d];if(f!==void 0)++f.referenceCount,r[h]=f;else{if(f=r[h],f!==void 0){if(f._cacheIndex===null)++f.referenceCount,this._addInactiveBinding(f,o,d);continue}let g=e&&e._propertyBindings[h].binding.parsedPath;f=new sc(te.create(n,d,g),u.ValueTypeName,u.getValueSize()),++f.referenceCount,this._addInactiveBinding(f,o,d),r[h]=f}a[h].resultBuffer=f.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){let n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let s=e[n];if(s.useCount++===0)this._lendBinding(s),s.saveOriginalState()}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let s=e[n];if(--s.useCount===0)s.restoreOriginalState(),this._takeBackBinding(s)}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let i=this._actions,s=this._actionsByClip,r=s[e];if(r===void 0)r={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=r;else{let a=r.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),r.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;let s=t._clip.uuid,r=this._actionsByClip,a=r[s],o=a.knownActions,l=o[o.length-1],c=t._byClipCacheIndex;l._byClipCacheIndex=c,o[c]=l,o.pop(),t._byClipCacheIndex=null;let h=a.actionByRoot,u=(t._localRoot||this._root).uuid;if(delete h[u],o.length===0)delete r[s];this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){let s=e[n];if(--s.referenceCount===0)this._removeInactiveBinding(s)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){let e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){let i=this._bindingsByRootAndName,s=this._bindings,r=i[e];if(r===void 0)r={},i[e]=r;r[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){let e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,r=this._bindingsByRootAndName,a=r[i],o=e[e.length-1],l=t._cacheIndex;if(o._cacheIndex=l,e[l]=o,e.pop(),delete a[s],Object.keys(a).length===0)delete r[i]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];if(n===void 0)n=new Ta(new Float32Array(2),new Float32Array(2),1,W_),n.__cacheIndex=e,t[e]=n;return n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){let i=e||this._root,s=i.uuid,r=typeof t==="string"?Li.findByName(i,t):t,a=r!==null?r.uuid:t,o=this._actionsByClip[a],l=null;if(n===void 0)if(r!==null)n=r.blendMode;else n=2500;if(o!==void 0){let h=o.actionByRoot[s];if(h!==void 0&&h.blendMode===n)return h;if(l=o.knownActions[0],r===null)r=l._clip}if(r===null)return null;let c=new rc(this,r,e,n);return this._bindAction(c,l),this._addInactiveAction(c,a,s),c}existingAction(t,e){let n=e||this._root,i=n.uuid,s=typeof t==="string"?Li.findByName(n,t):t,r=s?s.uuid:t,a=this._actionsByClip[r];if(a!==void 0)return a.actionByRoot[i]||null;return null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;let e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),r=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(i,t,s,r);let a=this._bindings,o=this._nActiveBindings;for(let l=0;l!==o;++l)a[l].apply(r);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){let r=s.knownActions;for(let a=0,o=r.length;a!==o;++a){let l=r[a];this._deactivateAction(l);let c=l._cacheIndex,h=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,h._cacheIndex=c,e[c]=h,e.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let r in n){let a=n[r].actionByRoot,o=a[e];if(o!==void 0)this._deactivateAction(o),this._removeInactiveAction(o)}let i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(let r in s){let a=s[r];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){let n=this.existingAction(t,e);if(n!==null)this._deactivateAction(n),this._removeInactiveAction(n)}}class Hu extends qr{constructor(t=1,e=1,n=1,i={}){super(t,e,i);this.isRenderTarget3D=!0,this.depth=n,this.texture=new Fs(null,t,e,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}}class ac{constructor(t){this.value=t}clone(){return new ac(this.value.clone===void 0?this.value:this.value.clone())}}var X_=0;class Gu extends un{constructor(){super();this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:X_++}),this.name="",this.usage=35044,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){let e=this.uniforms.indexOf(t);if(e!==-1)this.uniforms.splice(e,1);return this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage;let e=t.uniforms;this.uniforms.length=0;for(let n=0,i=e.length;n<i;n++){let s=Array.isArray(e[n])?e[n]:[e[n]];for(let r=0;r<s.length;r++)this.uniforms.push(s[r].clone())}return this}clone(){return new this.constructor().copy(this)}}class Vu extends ks{constructor(t,e,n=1){super(t,e);this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}class Wu{constructor(t,e,n,i,s,r=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=i,this.count=s,this.normalized=r,this.version=0}set needsUpdate(t){if(t===!0)this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}}var Df=new Bt;class Xu{constructor(t,e,n=0,i=1/0){this.ray=new Dn(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Os,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){if(e.isPerspectiveCamera)this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,0.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e;else if(e.isOrthographicCamera)this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e;else console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Df.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Df),this}intersectObject(t,e=!0,n=[]){return ah(t,this,n,e),n.sort(Lf),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)ah(t[i],this,n,e);return n.sort(Lf),n}}function Lf(t,e){return t.distance-e.distance}function ah(t,e,n,i){let s=!0;if(t.layers.test(e.layers)){if(t.raycast(e,n)===!1)s=!1}if(s===!0&&i===!0){let r=t.children;for(let a=0,o=r.length;a<o;a++)ah(r[a],e,n,!0)}}class qu{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){if(this._document=t,t.hidden!==void 0)this._pageVisibilityHandler=q_.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1)}disconnect(){if(this._pageVisibilityHandler!==null)this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null;this._document=null}getDelta(){return this._delta/1000}getElapsed(){return this._elapsed/1000}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){if(this._pageVisibilityHandler!==null&&this._document.hidden===!0)this._delta=0;else this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta;return this}}function q_(){if(this._document.hidden===!1)this.reset()}class Js{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ot(this.phi,0.000001,Math.PI-0.000001),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){if(this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0)this.theta=0,this.phi=0;else this.theta=Math.atan2(t,n),this.phi=Math.acos(Ot(e/this.radius,-1,1));return this}clone(){return new this.constructor().copy(this)}}class Yu{constructor(t=1,e=0,n=0){this.radius=t,this.theta=e,this.y=n}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}}class oc{constructor(t,e,n,i){if(oc.prototype.isMatrix2=!0,this.elements=[1,0,0,1],t!==void 0)this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}}var Uf=new H;class Zu{constructor(t=new H(1/0,1/0),e=new H(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Uf.copy(e).multiplyScalar(0.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Uf).distanceTo(t)}intersect(t){if(this.min.max(t.min),this.max.min(t.max),this.isEmpty())this.makeEmpty();return this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}var Nf=new E,_o=new E,vs=new E,ys=new E,jc=new E,Y_=new E,Z_=new E;class Ju{constructor(t=new E,e=new E){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(0.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Nf.subVectors(t,this.start),_o.subVectors(this.end,this.start);let n=_o.dot(_o),s=_o.dot(Nf)/n;if(e)s=Ot(s,0,1);return s}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(t,e=Y_,n=Z_){let s,r,a=this.start,o=t.start,l=this.end,c=t.end;vs.subVectors(l,a),ys.subVectors(c,o),jc.subVectors(a,o);let h=vs.dot(vs),u=ys.dot(ys),d=ys.dot(jc);if(h<=0.00000000000000010000000000000001&&u<=0.00000000000000010000000000000001)return e.copy(a),n.copy(o),e.sub(n),e.dot(e);if(h<=0.00000000000000010000000000000001)s=0,r=d/u,r=Ot(r,0,1);else{let f=vs.dot(jc);if(u<=0.00000000000000010000000000000001)r=0,s=Ot(-f/h,0,1);else{let g=vs.dot(ys),_=h*u-g*g;if(_!==0)s=Ot((g*d-f*u)/_,0,1);else s=0;if(r=(g*s+d)/u,r<0)r=0,s=Ot(-f/h,0,1);else if(r>1)r=1,s=Ot((g-f)/h,0,1)}}return e.copy(a).add(vs.multiplyScalar(s)),n.copy(o).add(ys.multiplyScalar(r)),e.sub(n),e.dot(e)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}var Ff=new E;class $u extends ne{constructor(t,e){super();this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";let n=new Ht,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let r=0,a=1,o=32;r<o;r++,a++){let l=r/o*Math.PI*2,c=a/o*Math.PI*2;i.push(Math.cos(l),Math.sin(l),1,Math.cos(c),Math.sin(c),1)}n.setAttribute("position",new Mt(i,3));let s=new Ue({fog:!1,toneMapped:!1});this.cone=new fn(n,s),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent)this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld);else this.matrix.copy(this.light.matrixWorld);this.matrixWorld.copy(this.light.matrixWorld);let t=this.light.distance?this.light.distance:1000,e=t*Math.tan(this.light.angle);if(this.cone.scale.set(e,e,t),Ff.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Ff),this.color!==void 0)this.cone.material.color.set(this.color);else this.cone.material.color.copy(this.light.color)}}var ii=new E,xo=new Bt,th=new Bt;class Ku extends fn{constructor(t){let e=om(t),n=new Ht,i=[],s=[];for(let l=0;l<e.length;l++){let c=e[l];if(c.parent&&c.parent.isBone)i.push(0,0,0),i.push(0,0,0),s.push(0,0,0),s.push(0,0,0)}n.setAttribute("position",new Mt(i,3)),n.setAttribute("color",new Mt(s,3));let r=new Ue({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,r);this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;let a=new dt(255),o=new dt(65280);this.setColors(a,o)}updateMatrixWorld(t){let e=this.bones,n=this.geometry,i=n.getAttribute("position");th.copy(this.root.matrixWorld).invert();for(let s=0,r=0;s<e.length;s++){let a=e[s];if(a.parent&&a.parent.isBone)xo.multiplyMatrices(th,a.matrixWorld),ii.setFromMatrixPosition(xo),i.setXYZ(r,ii.x,ii.y,ii.z),xo.multiplyMatrices(th,a.parent.matrixWorld),ii.setFromMatrixPosition(xo),i.setXYZ(r+1,ii.x,ii.y,ii.z),r+=2}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){let i=this.geometry.getAttribute("color");for(let s=0;s<i.count;s+=2)i.setXYZ(s,t.r,t.g,t.b),i.setXYZ(s+1,e.r,e.g,e.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}function om(t){let e=[];if(t.isBone===!0)e.push(t);for(let n=0;n<t.children.length;n++)e.push(...om(t.children[n]));return e}class Qu extends pe{constructor(t,e,n){let i=new qs(e,4,2),s=new dn({wireframe:!0,fog:!1,toneMapped:!1});super(i,s);this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.color!==void 0)this.material.color.set(this.color);else this.material.color.copy(this.light.color)}}var J_=new E,Of=new dt,Bf=new dt;class ju extends ne{constructor(t,e,n){super();this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new Xs(e);if(i.rotateY(Math.PI*0.5),this.material=new dn({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0)this.material.vertexColors=!0;let s=i.getAttribute("position"),r=new Float32Array(s.count*3);i.setAttribute("color",new se(r,3)),this.add(new pe(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let e=t.geometry.getAttribute("color");Of.copy(this.light.color),Bf.copy(this.light.groundColor);for(let n=0,i=e.count;n<i;n++){let s=n<i/2?Of:Bf;e.setXYZ(n,s.r,s.g,s.b)}e.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),t.lookAt(J_.setFromMatrixPosition(this.light.matrixWorld).negate())}}class td extends fn{constructor(t=10,e=10,n=4473924,i=8947848){n=new dt(n),i=new dt(i);let s=e/2,r=t/e,a=t/2,o=[],l=[];for(let u=0,d=0,f=-a;u<=e;u++,f+=r){o.push(-a,0,f,a,0,f),o.push(f,0,-a,f,0,a);let g=u===s?n:i;g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3,g.toArray(l,d),d+=3}let c=new Ht;c.setAttribute("position",new Mt(o,3)),c.setAttribute("color",new Mt(l,3));let h=new Ue({vertexColors:!0,toneMapped:!1});super(c,h);this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class ed extends fn{constructor(t=10,e=16,n=8,i=64,s=4473924,r=8947848){s=new dt(s),r=new dt(r);let a=[],o=[];if(e>1)for(let h=0;h<e;h++){let u=h/e*(Math.PI*2),d=Math.sin(u)*t,f=Math.cos(u)*t;a.push(0,0,0),a.push(d,0,f);let g=h&1?s:r;o.push(g.r,g.g,g.b),o.push(g.r,g.g,g.b)}for(let h=0;h<n;h++){let u=h&1?s:r,d=t-t/n*h;for(let f=0;f<i;f++){let g=f/i*(Math.PI*2),_=Math.sin(g)*d,m=Math.cos(g)*d;a.push(_,0,m),o.push(u.r,u.g,u.b),g=(f+1)/i*(Math.PI*2),_=Math.sin(g)*d,m=Math.cos(g)*d,a.push(_,0,m),o.push(u.r,u.g,u.b)}}let l=new Ht;l.setAttribute("position",new Mt(a,3)),l.setAttribute("color",new Mt(o,3));let c=new Ue({vertexColors:!0,toneMapped:!1});super(l,c);this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}var zf=new E,vo=new E,kf=new E;class nd extends ne{constructor(t,e,n){super();if(this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0)e=1;let i=new Ht;i.setAttribute("position",new Mt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));let s=new Ue({fog:!1,toneMapped:!1});this.lightPlane=new Pn(i,s),this.add(this.lightPlane),i=new Ht,i.setAttribute("position",new Mt([0,0,0,0,0,1],3)),this.targetLine=new Pn(i,s),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){if(this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),zf.setFromMatrixPosition(this.light.matrixWorld),vo.setFromMatrixPosition(this.light.target.matrixWorld),kf.subVectors(vo,zf),this.lightPlane.lookAt(vo),this.color!==void 0)this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color);else this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color);this.targetLine.lookAt(vo),this.targetLine.scale.z=kf.length()}}var yo=new E,ye=new Bs;class id extends fn{constructor(t){let e=new Ht,n=new Ue({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],s=[],r={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(f,g){o(f),o(g)}function o(f){if(i.push(0,0,0),s.push(0,0,0),r[f]===void 0)r[f]=[];r[f].push(i.length/3-1)}e.setAttribute("position",new Mt(i,3)),e.setAttribute("color",new Mt(s,3));super(e,n);if(this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix)this.camera.updateProjectionMatrix();this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=r,this.update();let l=new dt(16755200),c=new dt(16711680),h=new dt(43775),u=new dt(16777215),d=new dt(3355443);this.setColors(l,c,h,u,d)}setColors(t,e,n,i,s){let a=this.geometry.getAttribute("color");return a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,s.r,s.g,s.b),a.setXYZ(41,s.r,s.g,s.b),a.setXYZ(42,s.r,s.g,s.b),a.setXYZ(43,s.r,s.g,s.b),a.setXYZ(44,s.r,s.g,s.b),a.setXYZ(45,s.r,s.g,s.b),a.setXYZ(46,s.r,s.g,s.b),a.setXYZ(47,s.r,s.g,s.b),a.setXYZ(48,s.r,s.g,s.b),a.setXYZ(49,s.r,s.g,s.b),a.needsUpdate=!0,this}update(){let t=this.geometry,e=this.pointMap,n=1,i=1,s,r;if(ye.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)s=1,r=0;else if(this.camera.coordinateSystem===2000)s=-1,r=1;else if(this.camera.coordinateSystem===2001)s=0,r=1;else throw Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Me("c",e,t,ye,0,0,s),Me("t",e,t,ye,0,0,r),Me("n1",e,t,ye,-1,-1,s),Me("n2",e,t,ye,1,-1,s),Me("n3",e,t,ye,-1,1,s),Me("n4",e,t,ye,1,1,s),Me("f1",e,t,ye,-1,-1,r),Me("f2",e,t,ye,1,-1,r),Me("f3",e,t,ye,-1,1,r),Me("f4",e,t,ye,1,1,r),Me("u1",e,t,ye,0.7,1.1,s),Me("u2",e,t,ye,-0.7,1.1,s),Me("u3",e,t,ye,0,2,s),Me("cf1",e,t,ye,-1,0,r),Me("cf2",e,t,ye,1,0,r),Me("cf3",e,t,ye,0,-1,r),Me("cf4",e,t,ye,0,1,r),Me("cn1",e,t,ye,-1,0,s),Me("cn2",e,t,ye,1,0,s),Me("cn3",e,t,ye,0,-1,s),Me("cn4",e,t,ye,0,1,s),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}function Me(t,e,n,i,s,r,a){yo.set(s,r,a).unproject(i);let o=e[t];if(o!==void 0){let l=n.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],yo.x,yo.y,yo.z)}}var Mo=new Ie;class sd extends fn{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),s=new Ht;s.setIndex(new se(n,1)),s.setAttribute("position",new se(i,3));super(s,new Ue({color:e,toneMapped:!1}));this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0)Mo.setFromObject(this.object);if(Mo.isEmpty())return;let{min:t,max:e}=Mo,n=this.geometry.attributes.position,i=n.array;i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=t.x,i[4]=e.y,i[5]=e.z,i[6]=t.x,i[7]=t.y,i[8]=e.z,i[9]=e.x,i[10]=t.y,i[11]=e.z,i[12]=e.x,i[13]=e.y,i[14]=t.z,i[15]=t.x,i[16]=e.y,i[17]=t.z,i[18]=t.x,i[19]=t.y,i[20]=t.z,i[21]=e.x,i[22]=t.y,i[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class rd extends fn{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],s=new Ht;s.setIndex(new se(n,1)),s.setAttribute("position",new Mt(i,3));super(s,new Ue({color:e,toneMapped:!1}));this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){let e=this.box;if(e.isEmpty())return;e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(0.5),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose()}}class ad extends Pn{constructor(t,e=1,n=16776960){let i=n,s=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],r=new Ht;r.setAttribute("position",new Mt(s,3)),r.computeBoundingSphere();super(r,new Ue({color:i,toneMapped:!1}));this.type="PlaneHelper",this.plane=t,this.size=e;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],o=new Ht;o.setAttribute("position",new Mt(a,3)),o.computeBoundingSphere(),this.add(new pe(o,new dn({color:i,opacity:0.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(0.5*this.size,0.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}}var Hf=new E,So,eh;class od extends ne{constructor(t=new E(0,0,1),e=new E(0,0,0),n=1,i=16776960,s=n*0.2,r=s*0.2){super();if(this.type="ArrowHelper",So===void 0)So=new Ht,So.setAttribute("position",new Mt([0,0,0,0,1,0],3)),eh=new Vs(0.5,1,5,1),eh.translate(0,-0.5,0);this.position.copy(e),this.line=new Pn(So,new Ue({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new pe(eh,new dn({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,s,r)}setDirection(t){if(t.y>0.99999)this.quaternion.set(0,0,0,1);else if(t.y<-0.99999)this.quaternion.set(1,0,0,0);else{Hf.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(Hf,e)}}setLength(t,e=t*0.2,n=e*0.2){this.line.scale.set(1,Math.max(0.0001,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}}class ld extends fn{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,0.6,0,0,1,0,0.6,1,0,0,0,1,0,0.6,1],i=new Ht;i.setAttribute("position",new Mt(e,3)),i.setAttribute("color",new Mt(n,3));let s=new Ue({vertexColors:!0,toneMapped:!1});super(i,s);this.type="AxesHelper"}setColors(t,e,n){let i=new dt,s=this.geometry.attributes.color.array;return i.set(t),i.toArray(s,0),i.toArray(s,3),i.set(e),i.toArray(s,6),i.toArray(s,9),i.set(n),i.toArray(s,12),i.toArray(s,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class cd{constructor(){this.type="ShapePath",this.color=new dt,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new Es,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,i){return this.currentPath.quadraticCurveTo(t,e,n,i),this}bezierCurveTo(t,e,n,i,s,r){return this.currentPath.bezierCurveTo(t,e,n,i,s,r),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(m){let p=[];for(let v=0,x=m.length;v<x;v++){let M=m[v],R=new Vn;R.curves=M.curves,p.push(R)}return p}function n(m,p){let v=p.length,x=!1;for(let M=v-1,R=0;R<v;M=R++){let w=p[M],A=p[R],L=A.x-w.x,S=A.y-w.y;if(Math.abs(S)>Number.EPSILON){if(S<0)w=p[R],L=-L,A=p[M],S=-S;if(m.y<w.y||m.y>A.y)continue;if(m.y===w.y){if(m.x===w.x)return!0}else{let T=S*(m.x-w.x)-L*(m.y-w.y);if(T===0)return!0;if(T<0)continue;x=!x}}else{if(m.y!==w.y)continue;if(A.x<=m.x&&m.x<=w.x||w.x<=m.x&&m.x<=A.x)return!0}}return x}let i=ln.isClockWise,s=this.subPaths;if(s.length===0)return[];let r,a,o,l=[];if(s.length===1)return a=s[0],o=new Vn,o.curves=a.curves,l.push(o),l;let c=!i(s[0].getPoints());c=t?!c:c;let h=[],u=[],d=[],f=0,g;u[f]=void 0,d[f]=[];for(let m=0,p=s.length;m<p;m++)if(a=s[m],g=a.getPoints(),r=i(g),r=t?!r:r,r){if(!c&&u[f])f++;if(u[f]={s:new Vn,p:g},u[f].s.curves=a.curves,c)f++;d[f]=[]}else d[f].push({h:a,p:g[0]});if(!u[0])return e(s);if(u.length>1){let m=!1,p=0;for(let v=0,x=u.length;v<x;v++)h[v]=[];for(let v=0,x=u.length;v<x;v++){let M=d[v];for(let R=0;R<M.length;R++){let w=M[R],A=!0;for(let L=0;L<u.length;L++)if(n(w.p,u[L].p)){if(v!==L)p++;if(A)A=!1,h[L].push(w);else m=!0}if(A)h[v].push(w)}}if(p>0&&m===!1)d=h}let _;for(let m=0,p=u.length;m<p;m++){o=u[m].s,l.push(o),_=d[m];for(let v=0,x=_.length;v<x;v++)o.holes.push(_[v].h)}return l}}class Yi extends un{constructor(t,e=null){super();this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}if(this.domElement!==null)this.disconnect();this.domElement=t}disconnect(){}dispose(){}update(){}}function $_(t,e){let n=t.image&&t.image.width?t.image.width/t.image.height:1;if(n>e)t.repeat.x=1,t.repeat.y=n/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2;else t.repeat.x=e/n,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0;return t}function K_(t,e){let n=t.image&&t.image.width?t.image.width/t.image.height:1;if(n>e)t.repeat.x=e/n,t.repeat.y=1,t.offset.x=(1-t.repeat.x)/2,t.offset.y=0;else t.repeat.x=1,t.repeat.y=n/e,t.offset.x=0,t.offset.y=(1-t.repeat.y)/2;return t}function Q_(t){return t.repeat.x=1,t.repeat.y=1,t.offset.x=0,t.offset.y=0,t}function lc(t,e,n,i){let s=j_(i);switch(n){case 1021:return t*e;case 1028:return t*e/s.components*s.byteLength;case 1029:return t*e/s.components*s.byteLength;case 1030:return t*e*2/s.components*s.byteLength;case 1031:return t*e*2/s.components*s.byteLength;case 1022:return t*e*3/s.components*s.byteLength;case 1023:return t*e*4/s.components*s.byteLength;case 1033:return t*e*4/s.components*s.byteLength;case 33776:case 33777:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(t,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(t,8)*Math.max(e,8)/2;case 36196:case 37492:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case 37496:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 37808:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(t/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(t/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function j_(t){switch(t){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${t}.`)}class hd{static contain(t,e){return $_(t,e)}static cover(t,e){return K_(t,e)}static fill(t){return Q_(t)}static getByteLength(t,e,n,i){return lc(t,e,n,i)}}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));if(typeof window<"u")if(window.__THREE__)console.warn("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="180";function Im(){let t=null,e=!1,n=null,i=null;function s(r,a){n(r,a),i=t.requestAnimationFrame(s)}return{start:function(){if(e===!0)return;if(n===null)return;i=t.requestAnimationFrame(s),e=!0},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){n=r},setContext:function(r){t=r}}}function t0(t){let e=new WeakMap;function n(o,l){let{array:c,usage:h}=o,u=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=t.HALF_FLOAT;else if(c instanceof Uint16Array)if(o.isFloat16BufferAttribute)f=t.HALF_FLOAT;else f=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=t.SHORT;else if(c instanceof Uint32Array)f=t.UNSIGNED_INT;else if(c instanceof Int32Array)f=t.INT;else if(c instanceof Int8Array)f=t.BYTE;else if(c instanceof Uint8Array)f=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=t.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let{array:h,updateRanges:u}=l;if(t.bindBuffer(c,o),u.length===0)t.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];if(_.start<=g.start+g.count+1)g.count=Math.max(g.count,_.start+_.count-g.start);else++d,u[d]=_}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];t.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){if(o.isInterleavedBufferAttribute)o=o.data;return e.get(o)}function r(o){if(o.isInterleavedBufferAttribute)o=o.data;let l=e.get(o);if(l)t.deleteBuffer(l.buffer),e.delete(o)}function a(o,l){if(o.isInterleavedBufferAttribute)o=o.data;if(o.isGLBufferAttribute){let h=e.get(o);if(!h||h.version<o.version)e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var e0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,i0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,a0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,o0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,l0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,c0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,h0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,u0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,d0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,f0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,p0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,m0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,g0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,y0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,M0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,S0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,T0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,E0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,w0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,A0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,R0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I0="gl_FragColor = linearToOutputTexel( gl_FragColor );",D0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,L0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,N0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,F0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,B0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,z0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,k0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,G0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,V0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,W0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,X0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,q0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Y0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,K0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Q0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,j0=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ex=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ix=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ax=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ox=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_x=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ex=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ax=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Px=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ix=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Dx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ux=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ox=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,kx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Gx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Wx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$x=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,tv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ev=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ov=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;var _v=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ev=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Av=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Rv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Iv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Dv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:e0,alphahash_pars_fragment:n0,alphamap_fragment:i0,alphamap_pars_fragment:s0,alphatest_fragment:r0,alphatest_pars_fragment:a0,aomap_fragment:o0,aomap_pars_fragment:l0,batching_pars_vertex:c0,batching_vertex:h0,begin_vertex:u0,beginnormal_vertex:d0,bsdfs:f0,iridescence_fragment:p0,bumpmap_pars_fragment:m0,clipping_planes_fragment:g0,clipping_planes_pars_fragment:_0,clipping_planes_pars_vertex:x0,clipping_planes_vertex:v0,color_fragment:y0,color_pars_fragment:M0,color_pars_vertex:S0,color_vertex:b0,common:T0,cube_uv_reflection_fragment:E0,defaultnormal_vertex:w0,displacementmap_pars_vertex:A0,displacementmap_vertex:C0,emissivemap_fragment:R0,emissivemap_pars_fragment:P0,colorspace_fragment:I0,colorspace_pars_fragment:D0,envmap_fragment:L0,envmap_common_pars_fragment:U0,envmap_pars_fragment:N0,envmap_pars_vertex:F0,envmap_physical_pars_fragment:Y0,envmap_vertex:O0,fog_vertex:B0,fog_pars_vertex:z0,fog_fragment:k0,fog_pars_fragment:H0,gradientmap_pars_fragment:G0,lightmap_pars_fragment:V0,lights_lambert_fragment:W0,lights_lambert_pars_fragment:X0,lights_pars_begin:q0,lights_toon_fragment:Z0,lights_toon_pars_fragment:J0,lights_phong_fragment:$0,lights_phong_pars_fragment:K0,lights_physical_fragment:Q0,lights_physical_pars_fragment:j0,lights_fragment_begin:tx,lights_fragment_maps:ex,lights_fragment_end:nx,logdepthbuf_fragment:ix,logdepthbuf_pars_fragment:sx,logdepthbuf_pars_vertex:rx,logdepthbuf_vertex:ax,map_fragment:ox,map_pars_fragment:lx,map_particle_fragment:cx,map_particle_pars_fragment:hx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:dx,morphinstance_vertex:fx,morphcolor_vertex:px,morphnormal_vertex:mx,morphtarget_pars_vertex:gx,morphtarget_vertex:_x,normal_fragment_begin:xx,normal_fragment_maps:vx,normal_pars_fragment:yx,normal_pars_vertex:Mx,normal_vertex:Sx,normalmap_pars_fragment:bx,clearcoat_normal_fragment_begin:Tx,clearcoat_normal_fragment_maps:Ex,clearcoat_pars_fragment:wx,iridescence_pars_fragment:Ax,opaque_fragment:Cx,packing:Rx,premultiplied_alpha_fragment:Px,project_vertex:Ix,dithering_fragment:Dx,dithering_pars_fragment:Lx,roughnessmap_fragment:Ux,roughnessmap_pars_fragment:Nx,shadowmap_pars_fragment:Fx,shadowmap_pars_vertex:Ox,shadowmap_vertex:Bx,shadowmask_pars_fragment:zx,skinbase_vertex:kx,skinning_pars_vertex:Hx,skinning_vertex:Gx,skinnormal_vertex:Vx,specularmap_fragment:Wx,specularmap_pars_fragment:Xx,tonemapping_fragment:qx,tonemapping_pars_fragment:Yx,transmission_fragment:Zx,transmission_pars_fragment:Jx,uv_pars_fragment:$x,uv_pars_vertex:Kx,uv_vertex:Qx,worldpos_vertex:jx,background_vert:tv,background_frag:ev,backgroundCube_vert:nv,backgroundCube_frag:iv,cube_vert:sv,cube_frag:rv,depth_vert:av,depth_frag:ov,distanceRGBA_vert:lv,distanceRGBA_frag:cv,equirect_vert:hv,equirect_frag:uv,linedashed_vert:dv,linedashed_frag:fv,meshbasic_vert:pv,meshbasic_frag:mv,meshlambert_vert:gv,meshlambert_frag:_v,meshmatcap_vert:xv,meshmatcap_frag:vv,meshnormal_vert:yv,meshnormal_frag:Mv,meshphong_vert:Sv,meshphong_frag:bv,meshphysical_vert:Tv,meshphysical_frag:Ev,meshtoon_vert:wv,meshtoon_frag:Av,points_vert:Cv,points_frag:Rv,shadow_vert:Pv,shadow_frag:Iv,sprite_vert:Dv,sprite_frag:Lv},gt={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Vt}},envmap:{envMap:{value:null},envMapRotation:{value:new Vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Vt},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0},uvTransform:{value:new Vt}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new H(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Vt},alphaMap:{value:null},alphaMapTransform:{value:new Vt},alphaTest:{value:0}}},Tn={basic:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new dt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:ze([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:ze([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:ze([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new dt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:ze([gt.points,gt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:ze([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:ze([gt.common,gt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:ze([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:ze([gt.sprite,gt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Vt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:ze([gt.common,gt.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:ze([gt.lights,gt.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Tn.physical={uniforms:ze([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Vt},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Vt},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Vt},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Vt},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Vt},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Vt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};var cc={r:0,b:0,g:0},Zi=new Be,Uv=new Bt;function Nv(t,e,n,i,s,r,a){let o=new dt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture)M=(x.backgroundBlurriness>0?n:e).get(M);return M}function _(x){let M=!1,R=g(x);if(R===null)p(o,l);else if(R&&R.isColor)p(R,1),M=!0;let w=t.xr.getEnvironmentBlendMode();if(w==="additive")i.buffers.color.setClear(0,0,0,1,a);else if(w==="alpha-blend")i.buffers.color.setClear(0,0,0,0,a);if(t.autoClear||M)i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil)}function m(x,M){let R=g(M);if(R&&(R.isCubeTexture||R.mapping===Ps)){if(h===void 0)h=new pe(new hi(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:Gi(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,A,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h);if(Zi.copy(M.backgroundRotation),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1)Zi.y*=-1,Zi.z*=-1;if(h.material.uniforms.envMap.value=R,h.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Uv.makeRotationFromEuler(Zi)),h.material.toneMapped=Kt.getTransfer(R.colorSpace)!==re,u!==R||d!==R.version||f!==t.toneMapping)h.material.needsUpdate=!0,u=R,d=R.version,f=t.toneMapping;h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)}else if(R&&R.isTexture){if(c===void 0)c=new pe(new Wi(2,2),new Se({name:"BackgroundMaterial",uniforms:Gi(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c);if(c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(R.colorSpace)!==re,R.matrixAutoUpdate===!0)R.updateMatrix();if(c.material.uniforms.uvTransform.value.copy(R.matrix),u!==R||d!==R.version||f!==t.toneMapping)c.material.needsUpdate=!0,u=R,d=R.version,f=t.toneMapping;c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)}}function p(x,M){x.getRGB(cc,mu(t)),i.buffers.color.setClear(cc.r,cc.g,cc.b,M,a)}function v(){if(h!==void 0)h.geometry.dispose(),h.material.dispose(),h=void 0;if(c!==void 0)c.geometry.dispose(),c.material.dispose(),c=void 0}return{getClearColor:function(){return o},setClearColor:function(x,M=1){o.set(x),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(o,l)},render:_,addToRenderList:m,dispose:v}}function Fv(t,e){let n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(T,I,k,V,B){let K=!1,W=u(V,k,I);if(r!==W)r=W,c(r.object);if(K=f(T,V,k,B),K)g(T,V,k,B);if(B!==null)e.update(B,t.ELEMENT_ARRAY_BUFFER);if(K||a){if(a=!1,M(T,I,k,V),B!==null)t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer)}}function l(){return t.createVertexArray()}function c(T){return t.bindVertexArray(T)}function h(T){return t.deleteVertexArray(T)}function u(T,I,k){let V=k.wireframe===!0,B=i[T.id];if(B===void 0)B={},i[T.id]=B;let K=B[I.id];if(K===void 0)K={},B[I.id]=K;let W=K[V];if(W===void 0)W=d(l()),K[V]=W;return W}function d(T){let I=[],k=[],V=[];for(let B=0;B<n;B++)I[B]=0,k[B]=0,V[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:V,object:T,attributes:{},index:null}}function f(T,I,k,V){let B=r.attributes,K=I.attributes,W=0,nt=k.getAttributes();for(let G in nt)if(nt[G].location>=0){let pt=B[G],Dt=K[G];if(Dt===void 0){if(G==="instanceMatrix"&&T.instanceMatrix)Dt=T.instanceMatrix;if(G==="instanceColor"&&T.instanceColor)Dt=T.instanceColor}if(pt===void 0)return!0;if(pt.attribute!==Dt)return!0;if(Dt&&pt.data!==Dt.data)return!0;W++}if(r.attributesNum!==W)return!0;if(r.index!==V)return!0;return!1}function g(T,I,k,V){let B={},K=I.attributes,W=0,nt=k.getAttributes();for(let G in nt)if(nt[G].location>=0){let pt=K[G];if(pt===void 0){if(G==="instanceMatrix"&&T.instanceMatrix)pt=T.instanceMatrix;if(G==="instanceColor"&&T.instanceColor)pt=T.instanceColor}let Dt={};if(Dt.attribute=pt,pt&&pt.data)Dt.data=pt.data;B[G]=Dt,W++}r.attributes=B,r.attributesNum=W,r.index=V}function _(){let T=r.newAttributes;for(let I=0,k=T.length;I<k;I++)T[I]=0}function m(T){p(T,0)}function p(T,I){let k=r.newAttributes,V=r.enabledAttributes,B=r.attributeDivisors;if(k[T]=1,V[T]===0)t.enableVertexAttribArray(T),V[T]=1;if(B[T]!==I)t.vertexAttribDivisor(T,I),B[T]=I}function v(){let T=r.newAttributes,I=r.enabledAttributes;for(let k=0,V=I.length;k<V;k++)if(I[k]!==T[k])t.disableVertexAttribArray(k),I[k]=0}function x(T,I,k,V,B,K,W){if(W===!0)t.vertexAttribIPointer(T,I,k,B,K);else t.vertexAttribPointer(T,I,k,V,B,K)}function M(T,I,k,V){_();let B=V.attributes,K=k.getAttributes(),W=I.defaultAttributeValues;for(let nt in K){let G=K[nt];if(G.location>=0){let ft=B[nt];if(ft===void 0){if(nt==="instanceMatrix"&&T.instanceMatrix)ft=T.instanceMatrix;if(nt==="instanceColor"&&T.instanceColor)ft=T.instanceColor}if(ft!==void 0){let pt=ft.normalized,Dt=ft.itemSize,Wt=e.get(ft);if(Wt===void 0)continue;let{buffer:de,type:jt,bytesPerElement:Z}=Wt,mt=jt===t.INT||jt===t.UNSIGNED_INT||ft.gpuType===Po;if(ft.isInterleavedBufferAttribute){let ct=ft.data,bt=ct.stride,Ut=ft.offset;if(ct.isInstancedInterleavedBuffer){for(let zt=0;zt<G.locationSize;zt++)p(G.location+zt,ct.meshPerAttribute);if(T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0)V._maxInstanceCount=ct.meshPerAttribute*ct.count}else for(let zt=0;zt<G.locationSize;zt++)m(G.location+zt);t.bindBuffer(t.ARRAY_BUFFER,de);for(let zt=0;zt<G.locationSize;zt++)x(G.location+zt,Dt/G.locationSize,jt,pt,bt*Z,(Ut+Dt/G.locationSize*zt)*Z,mt)}else{if(ft.isInstancedBufferAttribute){for(let ct=0;ct<G.locationSize;ct++)p(G.location+ct,ft.meshPerAttribute);if(T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0)V._maxInstanceCount=ft.meshPerAttribute*ft.count}else for(let ct=0;ct<G.locationSize;ct++)m(G.location+ct);t.bindBuffer(t.ARRAY_BUFFER,de);for(let ct=0;ct<G.locationSize;ct++)x(G.location+ct,Dt/G.locationSize,jt,pt,Dt*Z,Dt/G.locationSize*ct*Z,mt)}}else if(W!==void 0){let pt=W[nt];if(pt!==void 0)switch(pt.length){case 2:t.vertexAttrib2fv(G.location,pt);break;case 3:t.vertexAttrib3fv(G.location,pt);break;case 4:t.vertexAttrib4fv(G.location,pt);break;default:t.vertexAttrib1fv(G.location,pt)}}}}v()}function R(){L();for(let T in i){let I=i[T];for(let k in I){let V=I[k];for(let B in V)h(V[B].object),delete V[B];delete I[k]}delete i[T]}}function w(T){if(i[T.id]===void 0)return;let I=i[T.id];for(let k in I){let V=I[k];for(let B in V)h(V[B].object),delete V[B];delete I[k]}delete i[T.id]}function A(T){for(let I in i){let k=i[I];if(k[T.id]===void 0)continue;let V=k[T.id];for(let B in V)h(V[B].object),delete V[B];delete k[T.id]}}function L(){if(S(),a=!0,r===s)return;r=s,c(r.object)}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function Ov(t,e,n){let i;function s(c){i=c}function r(c,h){t.drawArrays(i,c,h),n.update(h,i,1)}function a(c,h,u){if(u===0)return;t.drawArraysInstanced(i,c,h,u),n.update(h,i,u)}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];n.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Bv(t,e,n,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");s=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){if(A!==bn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function o(A){let L=A===hn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));if(A!==qn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Yn&&!L)return!1;return!0}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}if(A==="mediump"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);if(h!==c)console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h;let u=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),x=t.getParameter(t.MAX_VARYING_VECTORS),M=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,w=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:M,vertexTextures:R,maxSamples:w}}function zv(t){let e=this,n=null,i=0,s=!1,r=!1,a=new on,o=new Vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||s;return s=d,i=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){n=h(u,d,0)},this.setState=function(u,d,f){let{clippingPlanes:g,clipIntersection:_,clipShadows:m}=u,p=t.get(u);if(!s||g===null||g.length===0||r&&!m)if(r)h(null);else c();else{let v=r?0:i,x=v*4,M=p.clippingState||null;l.value=M,M=h(g,d,x,f);for(let R=0;R!==x;++R)M[R]=n[R];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){if(l.value!==n)l.value=n,l.needsUpdate=i>0;e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,m=null;if(_!==0){if(m=l.value,g!==!0||m===null){let p=f+_*4,v=d.matrixWorldInverse;if(o.getNormalMatrix(v),m===null||m.length<p)m=new Float32Array(p);for(let x=0,M=f;x!==_;++x,M+=4)a.copy(u[x]).applyMatrix4(v,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function kv(t){let e=new WeakMap;function n(a,o){if(o===Br)a.mapping=Oi;else if(o===zr)a.mapping=oi;return a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===Br||o===zr)if(e.has(a)){let l=e.get(a).texture;return n(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new _l(l.height);return c.fromEquirectangularTexture(t,a),e.set(a,c),a.addEventListener("dispose",s),n(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);if(l!==void 0)e.delete(o),l.dispose()}function r(){e=new WeakMap}return{get:i,dispose:r}}var Ks=4,lm=[0.125,0.215,0.35,0.446,0.526,0.582],Ki=20,ud=new di,cm=new dt,dd=null,fd=0,pd=0,md=!1,$i=(1+Math.sqrt(5))/2,$s=1/$i,hm=[new E(-$i,$s,0),new E($i,$s,0),new E(-$s,0,$i),new E($s,0,$i),new E(0,$i,-$s),new E(0,$i,$s),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],Hv=new E;class dc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=0.1,i=100,s={}){let{size:r=256,position:a=Hv}=s;dd=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),pd=this._renderer.getActiveMipmapLevel(),md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let o=this._allocateTargets();if(o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o,a),e>0)this._blur(o,0,0,e);return this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=fm(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=dm(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(dd,fd,pd),this._renderer.xr.enabled=md,t.scissorTest=!1,hc(t,0,0,t.width,t.height)}_fromTexture(t,e){if(t.mapping===Oi||t.mapping===oi)this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width);else this._setSize(t.image.width/4);dd=this._renderer.getRenderTarget(),fd=this._renderer.getActiveCubeFace(),pd=this._renderer.getActiveMipmapLevel(),md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:li,minFilter:li,generateMipmaps:!1,type:hn,format:bn,colorSpace:Us,depthBuffer:!1},i=um(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=um(t,e,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Gv(s)),this._blurMaterial=Vv(s,t,e)}return i}_compileMaterial(t){let e=new pe(this._lodPlanes[0],t);this._renderer.compile(e,ud)}_sceneToCubeUV(t,e,n,i,s){let o=new Te(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,{autoClear:u,toneMapping:d}=h;if(h.getClearColor(cm),h.toneMapping=In,h.autoClear=!1,h.state.buffers.depth.getReversed())h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null);let g=new dn({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),_=new pe(new hi,g),m=!1,p=t.background;if(p){if(p.isColor)g.color.copy(p),t.background=null,m=!0}else g.color.copy(cm),m=!0;for(let v=0;v<6;v++){let x=v%3;if(x===0)o.up.set(0,l[v],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x+c[v],s.y,s.z);else if(x===1)o.up.set(0,0,l[v]),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y+c[v],s.z);else o.up.set(0,l[v],0),o.position.set(s.x,s.y,s.z),o.lookAt(s.x,s.y,s.z+c[v]);let M=this._cubeSize;if(hc(i,x*M,v>2?M:0,M,M),h.setRenderTarget(i),m)h.render(_,o);h.render(t,o)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,i=t.mapping===Oi||t.mapping===oi;if(i){if(this._cubemapMaterial===null)this._cubemapMaterial=fm();this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=dm();let s=i?this._cubemapMaterial:this._equirectMaterial,r=new pe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;let o=this._cubeSize;hc(e,0,0,3*o,2*o),n.setRenderTarget(e),n.render(r,ud)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=hm[(i-s-1)%hm.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,i,s){let r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",s),this._halfBlur(r,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,r,a){let o=this._renderer,l=this._blurMaterial;if(r!=="latitudinal"&&r!=="longitudinal")console.error("blur direction must be either latitudinal or longitudinal!");let c=3,h=new pe(this._lodPlanes[i],l),u=l.uniforms,d=this._sizeLods[n]-1,f=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Ki-1),g=s/f,_=isFinite(s)?1+Math.floor(c*g):Ki;if(_>Ki)console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Ki}`);let m=[],p=0;for(let w=0;w<Ki;++w){let A=w/g,L=Math.exp(-A*A/2);if(m.push(L),w===0)p+=L;else if(w<_)p+=2*L}for(let w=0;w<m.length;w++)m[w]=m[w]/p;if(u.envMap.value=t.texture,u.samples.value=_,u.weights.value=m,u.latitudinal.value=r==="latitudinal",a)u.poleAxis.value=a;let{_lodMax:v}=this;u.dTheta.value=f,u.mipInt.value=v-n;let x=this._sizeLods[i],M=3*x*(i>v-Ks?i-v+Ks:0),R=4*(this._cubeSize-x);hc(e,M,R,3*x,2*x),o.setRenderTarget(e),o.render(h,ud)}}function Gv(t){let e=[],n=[],i=[],s=t,r=t-Ks+1+lm.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);n.push(o);let l=1/o;if(a>t-Ks)l=lm[a-t+Ks-1];else if(a===0)l=0;i.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*f),x=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let w=0;w<f;w++){let A=w%3*2/3-1,L=w>2?0:-1,S=[A,L,0,A+0.6666666666666666,L,0,A+0.6666666666666666,L+1,0,A,L,0,A+0.6666666666666666,L+1,0,A,L+1,0];v.set(S,_*g*w),x.set(d,m*g*w);let T=[w,w,w,w,w,w];M.set(T,p*g*w)}let R=new Ht;if(R.setAttribute("position",new se(v,_)),R.setAttribute("uv",new se(x,m)),R.setAttribute("faceIndex",new se(M,p)),e.push(R),s>Ks)s--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function um(t,e,n){let i=new De(t,e,n);return i.texture.mapping=Ps,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hc(t,e,n,i,s){t.viewport.set(e,n,i,s),t.scissor.set(e,n,i,s)}function Vv(t,e,n){let i=new Float32Array(Ki),s=new E(0,1,0);return new Se({name:"SphericalGaussianBlur",defines:{n:Ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function dm(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function fm(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Sn,depthTest:!1,depthWrite:!1})}function xd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wv(t){let e=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===Br||l===zr,h=l===Oi||l===oi;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d){if(n===null)n=new dc(t);return u=c?n.fromEquirectangular(o,u):n.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture}else if(u!==void 0)return u.texture;else{let f=o.image;if(c&&f&&f.height>0||h&&f&&s(f)){if(n===null)n=new dc(t);return u=c?n.fromEquirectangular(o):n.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)if(o[h]!==void 0)l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);if(c!==void 0)e.delete(l),c.dispose()}function a(){if(e=new WeakMap,n!==null)n.dispose(),n=null}return{get:i,dispose:a}}function Xv(t){let e={};function n(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=t.getExtension(i)}return e[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);if(s===null)Ts("THREE.WebGLRenderer: "+i+" extension not supported.");return s}}}function qv(t,e,n,i){let s={},r=new WeakMap;function a(u){let d=u.target;if(d.index!==null)e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);if(f)e.remove(f),r.delete(d);if(i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0)delete d._maxInstanceCount;n.memory.geometries--}function o(u,d){if(s[d.id]===!0)return d;return d.addEventListener("dispose",a),s[d.id]=!0,n.memory.geometries++,d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],t.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,_=0;if(f!==null){let v=f.array;_=f.version;for(let x=0,M=v.length;x<M;x+=3){let R=v[x+0],w=v[x+1],A=v[x+2];d.push(R,w,w,A,A,R)}}else if(g!==void 0){let v=g.array;_=g.version;for(let x=0,M=v.length/3-1;x<M;x+=3){let R=x+0,w=x+1,A=x+2;d.push(R,w,w,A,A,R)}}else return;let m=new((su(d))?Zr:Yr)(d,1);m.version=_;let p=r.get(u);if(p)e.remove(p);r.set(u,m)}function h(u){let d=r.get(u);if(d){let f=u.index;if(f!==null){if(d.version<f.version)c(u)}}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Yv(t,e,n){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){t.drawElements(i,f,r,d*a),n.update(f,i,1)}function c(d,f,g){if(g===0)return;t.drawElementsInstanced(i,f,r,d*a,g),n.update(f,i,g)}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];n.update(m,i,1)}function u(d,f,g,_){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,d,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=f[v]*_[v];n.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Zv(t){let e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(r/3);break;case t.LINES:n.lines+=o*(r/2);break;case t.LINE_STRIP:n.lines+=o*(r-1);break;case t.LINE_LOOP:n.lines+=o*r;break;case t.POINTS:n.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Jv(t,e,n){let i=new WeakMap,s=new ee;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let S=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",S)};if(d!==void 0)d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],x=0;if(f===!0)x=1;if(g===!0)x=2;if(_===!0)x=3;let M=o.attributes.position.count*x,R=1;if(M>e.maxTextureSize)R=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize;let w=new Float32Array(M*R*4*u),A=new Ns(w,M,R,u);A.type=Yn,A.needsUpdate=!0;let L=x*4;for(let T=0;T<u;T++){let I=m[T],k=p[T],V=v[T],B=M*R*4*T;for(let K=0;K<I.count;K++){let W=K*L;if(f===!0)s.fromBufferAttribute(I,K),w[B+W+0]=s.x,w[B+W+1]=s.y,w[B+W+2]=s.z,w[B+W+3]=0;if(g===!0)s.fromBufferAttribute(k,K),w[B+W+4]=s.x,w[B+W+5]=s.y,w[B+W+6]=s.z,w[B+W+7]=0;if(_===!0)s.fromBufferAttribute(V,K),w[B+W+8]=s.x,w[B+W+9]=s.y,w[B+W+10]=s.z,w[B+W+11]=V.itemSize===4?s.w:1}}d={count:u,texture:A,size:new H(M,R)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(t,"morphTargetBaseInfluence",g),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:r}}function $v(t,e,n,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c)e.update(u),s.set(u,c);if(l.isInstancedMesh){if(l.hasEventListener("dispose",o)===!1)l.addEventListener("dispose",o);if(s.get(l)!==c){if(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null)n.update(l.instanceColor,t.ARRAY_BUFFER);s.set(l,c)}}if(l.isSkinnedMesh){let d=l.skeleton;if(s.get(d)!==c)d.update(),s.set(d,c)}return u}function a(){s=new WeakMap}function o(l){let c=l.target;if(c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null)n.remove(c.instanceColor)}return{update:r,dispose:a}}var Dm=new xe,pm=new na(1,1),Lm=new Ns,Um=new Fs,Nm=new Vi,mm=[],gm=[],_m=new Float32Array(16),xm=new Float32Array(9),vm=new Float32Array(4);function Qs(t,e,n){let i=t[0];if(i<=0||i>0)return t;let s=e*n,r=mm[s];if(r===void 0)r=new Float32Array(s),mm[s]=r;if(e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(r,o)}return r}function Ae(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ce(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function fc(t,e){let n=gm[e];if(n===void 0)n=new Int32Array(e),gm[e]=n;for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Kv(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1f(this.addr,e),n[0]=e}function Qv(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ae(n,e))return;t.uniform2fv(this.addr,e),Ce(n,e)}}function jv(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else if(e.r!==void 0){if(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b}else{if(Ae(n,e))return;t.uniform3fv(this.addr,e),Ce(n,e)}}function ty(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ae(n,e))return;t.uniform4fv(this.addr,e),Ce(n,e)}}function ey(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ae(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ce(n,e)}else{if(Ae(n,i))return;vm.set(i),t.uniformMatrix2fv(this.addr,!1,vm),Ce(n,i)}}function ny(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ae(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ce(n,e)}else{if(Ae(n,i))return;xm.set(i),t.uniformMatrix3fv(this.addr,!1,xm),Ce(n,i)}}function iy(t,e){let n=this.cache,i=e.elements;if(i===void 0){if(Ae(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ce(n,e)}else{if(Ae(n,i))return;_m.set(i),t.uniformMatrix4fv(this.addr,!1,_m),Ce(n,i)}}function sy(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1i(this.addr,e),n[0]=e}function ry(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ae(n,e))return;t.uniform2iv(this.addr,e),Ce(n,e)}}function ay(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else{if(Ae(n,e))return;t.uniform3iv(this.addr,e),Ce(n,e)}}function oy(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ae(n,e))return;t.uniform4iv(this.addr,e),Ce(n,e)}}function ly(t,e){let n=this.cache;if(n[0]===e)return;t.uniform1ui(this.addr,e),n[0]=e}function cy(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y)t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y}else{if(Ae(n,e))return;t.uniform2uiv(this.addr,e),Ce(n,e)}}function hy(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z}else{if(Ae(n,e))return;t.uniform3uiv(this.addr,e),Ce(n,e)}}function uy(t,e){let n=this.cache;if(e.x!==void 0){if(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w}else{if(Ae(n,e))return;t.uniform4uiv(this.addr,e),Ce(n,e)}}function dy(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;let r;if(this.type===t.SAMPLER_2D_SHADOW)pm.compareFunction=ul,r=pm;else r=Dm;n.setTexture2D(e||r,s)}function fy(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTexture3D(e||Um,s)}function py(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTextureCube(e||Nm,s)}function my(t,e,n){let i=this.cache,s=n.allocateTextureUnit();if(i[0]!==s)t.uniform1i(this.addr,s),i[0]=s;n.setTexture2DArray(e||Lm,s)}function gy(t){switch(t){case 5126:return Kv;case 35664:return Qv;case 35665:return jv;case 35666:return ty;case 35674:return ey;case 35675:return ny;case 35676:return iy;case 5124:case 35670:return sy;case 35667:case 35671:return ry;case 35668:case 35672:return ay;case 35669:case 35673:return oy;case 5125:return ly;case 36294:return cy;case 36295:return hy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return dy;case 35679:case 36299:case 36307:return fy;case 35680:case 36300:case 36308:case 36293:return py;case 36289:case 36303:case 36311:case 36292:return my}}function _y(t,e){t.uniform1fv(this.addr,e)}function xy(t,e){let n=Qs(e,this.size,2);t.uniform2fv(this.addr,n)}function vy(t,e){let n=Qs(e,this.size,3);t.uniform3fv(this.addr,n)}function yy(t,e){let n=Qs(e,this.size,4);t.uniform4fv(this.addr,n)}function My(t,e){let n=Qs(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Sy(t,e){let n=Qs(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function by(t,e){let n=Qs(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Ty(t,e){t.uniform1iv(this.addr,e)}function Ey(t,e){t.uniform2iv(this.addr,e)}function wy(t,e){t.uniform3iv(this.addr,e)}function Ay(t,e){t.uniform4iv(this.addr,e)}function Cy(t,e){t.uniform1uiv(this.addr,e)}function Ry(t,e){t.uniform2uiv(this.addr,e)}function Py(t,e){t.uniform3uiv(this.addr,e)}function Iy(t,e){t.uniform4uiv(this.addr,e)}function Dy(t,e,n){let i=this.cache,s=e.length,r=fc(n,s);if(!Ae(i,r))t.uniform1iv(this.addr,r),Ce(i,r);for(let a=0;a!==s;++a)n.setTexture2D(e[a]||Dm,r[a])}function Ly(t,e,n){let i=this.cache,s=e.length,r=fc(n,s);if(!Ae(i,r))t.uniform1iv(this.addr,r),Ce(i,r);for(let a=0;a!==s;++a)n.setTexture3D(e[a]||Um,r[a])}function Uy(t,e,n){let i=this.cache,s=e.length,r=fc(n,s);if(!Ae(i,r))t.uniform1iv(this.addr,r),Ce(i,r);for(let a=0;a!==s;++a)n.setTextureCube(e[a]||Nm,r[a])}function Ny(t,e,n){let i=this.cache,s=e.length,r=fc(n,s);if(!Ae(i,r))t.uniform1iv(this.addr,r),Ce(i,r);for(let a=0;a!==s;++a)n.setTexture2DArray(e[a]||Lm,r[a])}function Fy(t){switch(t){case 5126:return _y;case 35664:return xy;case 35665:return vy;case 35666:return yy;case 35674:return My;case 35675:return Sy;case 35676:return by;case 5124:case 35670:return Ty;case 35667:case 35671:return Ey;case 35668:case 35672:return wy;case 35669:case 35673:return Ay;case 5125:return Cy;case 36294:return Ry;case 36295:return Py;case 36296:return Iy;case 35678:case 36198:case 36298:case 36306:case 35682:return Dy;case 35679:case 36299:case 36307:return Ly;case 35680:case 36300:case 36308:case 36293:return Uy;case 36289:case 36303:case 36311:case 36292:return Ny}}class Fm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gy(e.type)}}class Om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fy(e.type)}}class Bm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let s=0,r=i.length;s!==r;++s){let a=i[s];a.setValue(t,e[a.id],n)}}}var gd=/(\w+)(\])?(\[|\.)?/g;function ym(t,e){t.seq.push(e),t.map[e.id]=e}function Oy(t,e,n){let i=t.name,s=i.length;gd.lastIndex=0;while(!0){let r=gd.exec(i),a=gd.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l)o=o|0;if(c===void 0||c==="["&&a+2===s){ym(n,c===void 0?new Fm(o,t,e):new Om(o,t,e));break}else{let u=n.map[o];if(u===void 0)u=new Bm(o),ym(n,u);n=u}}}class Pa{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=t.getActiveUniform(e,i),r=t.getUniformLocation(e,s.name);Oy(s,r,this)}}setValue(t,e,n,i){let s=this.map[e];if(s!==void 0)s.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];if(i!==void 0)this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,r=e.length;s!==r;++s){let a=e[s],o=n[a.id];if(o.needsUpdate!==!1)a.setValue(t,o.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,s=t.length;i!==s;++i){let r=t[i];if(r.id in e)n.push(r)}return n}}function Mm(t,e,n){let i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}var By=37297,zy=0;function ky(t,e){let n=t.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,n.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}var Sm=new Vt;function Hy(t){Kt._getMatrix(Sm,Kt.workingColorSpace,t);let e=`mat3( ${Sm.elements.map((n)=>n.toFixed(4))} )`;switch(Kt.getTransfer(t)){case hl:return[e,"LinearTransferOETF"];case re:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function bm(t,e,n){let i=t.getShaderParameter(e,t.COMPILE_STATUS),r=(t.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+ky(t.getShaderSource(e),o)}else return r}function Gy(t,e){let n=Hy(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Vy(t,e){let n;switch(e){case Ir:n="Linear";break;case Dr:n="Reinhard";break;case Lr:n="Cineon";break;case Ur:n="ACESFilmic";break;case Fr:n="AgX";break;case Or:n="Neutral";break;case Nr:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var uc=new E;function Wy(){Kt.getLuminanceCoefficients(uc);let t=uc.x.toFixed(4),e=uc.y.toFixed(4),n=uc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function Xy(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ra).join(`
`)}function qy(t){let e=[];for(let n in t){let i=t[n];if(i===!1)continue;e.push("#define "+n+" "+i)}return e.join(`
`)}function Yy(t,e){let n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=t.getActiveAttrib(e,s),a=r.name,o=1;if(r.type===t.FLOAT_MAT2)o=2;if(r.type===t.FLOAT_MAT3)o=3;if(r.type===t.FLOAT_MAT4)o=4;n[a]={type:r.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ra(t){return t!==""}function Tm(t,e){let n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Em(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function _d(t){return t.replace(Zy,$y)}var Jy=new Map;function $y(t,e){let n=Jt[e];if(n===void 0){let i=Jy.get(e);if(i!==void 0)n=Jt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw Error("Can not resolve #include <"+e+">")}return _d(n)}var Ky=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wm(t){return t.replace(Ky,Qy)}function Qy(t,e,n,i){let s="";for(let r=parseInt(e);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Am(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;if(t.precision==="highp")e+=`
#define HIGH_PRECISION`;else if(t.precision==="mediump")e+=`
#define MEDIUM_PRECISION`;else if(t.precision==="lowp")e+=`
#define LOW_PRECISION`;return e}function jy(t){let e="SHADOWMAP_TYPE_BASIC";if(t.shadowMapType===Ao)e="SHADOWMAP_TYPE_PCF";else if(t.shadowMapType===hh)e="SHADOWMAP_TYPE_PCF_SOFT";else if(t.shadowMapType===yn)e="SHADOWMAP_TYPE_VSM";return e}function tM(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Oi:case oi:e="ENVMAP_TYPE_CUBE";break;case Ps:e="ENVMAP_TYPE_CUBE_UV";break}return e}function eM(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case oi:e="ENVMAP_MODE_REFRACTION";break}return e}function nM(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Ih:e="ENVMAP_BLENDING_MULTIPLY";break;case Dh:e="ENVMAP_BLENDING_MIX";break;case Lh:e="ENVMAP_BLENDING_ADD";break}return e}function iM(t){let e=t.envMapCubeUVHeight;if(e===null)return null;let n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function sM(t,e,n,i){let s=t.getContext(),{defines:r,vertexShader:a,fragmentShader:o}=n,l=jy(n),c=tM(n),h=eM(n),u=nM(n),d=iM(n),f=Xy(n),g=qy(r),_=s.createProgram(),m,p,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";if(n.isRawShaderMaterial){if(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ra).join(`
`),m.length>0)m+=`
`;if(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ra).join(`
`),p.length>0)p+=`
`}else m=[Am(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(Ra).join(`
`),p=[Am(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==In?"#define TONE_MAPPING":"",n.toneMapping!==In?Jt.tonemapping_pars_fragment:"",n.toneMapping!==In?Vy("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Gy("linearToOutputTexel",n.outputColorSpace),Wy(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ra).join(`
`);if(a=_d(a),a=Tm(a,n),a=Em(a,n),o=_d(o),o=Tm(o,n),o=Em(o,n),a=wm(a),o=wm(o),n.isRawShaderMaterial!==!0)v=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===dl?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===dl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p;let x=v+m+a,M=v+p+o,R=Mm(s,s.VERTEX_SHADER,x),w=Mm(s,s.FRAGMENT_SHADER,M);if(s.attachShader(_,R),s.attachShader(_,w),n.index0AttributeName!==void 0)s.bindAttribLocation(_,0,n.index0AttributeName);else if(n.morphTargets===!0)s.bindAttribLocation(_,0,"position");s.linkProgram(_);function A(I){if(t.debug.checkShaderErrors){let k=s.getProgramInfoLog(_)||"",V=s.getShaderInfoLog(R)||"",B=s.getShaderInfoLog(w)||"",K=k.trim(),W=V.trim(),nt=B.trim(),G=!0,ft=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof t.debug.onShaderError==="function")t.debug.onShaderError(s,_,R,w);else{let pt=bm(s,R,"vertex"),Dt=bm(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+K+`
`+pt+`
`+Dt)}else if(K!=="")console.warn("THREE.WebGLProgram: Program Info Log:",K);else if(W===""||nt==="")ft=!1;if(ft)I.diagnostics={runnable:G,programLog:K,vertexShader:{log:W,prefix:m},fragmentShader:{log:nt,prefix:p}}}s.deleteShader(R),s.deleteShader(w),L=new Pa(s,_),S=Yy(s,_)}let L;this.getUniforms=function(){if(L===void 0)A(this);return L};let S;this.getAttributes=function(){if(S===void 0)A(this);return S};let T=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(T===!1)T=s.getProgramParameter(_,By);return T},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zy++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=w,this}var rM=0;class zm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let{vertexShader:e,fragmentShader:n}=t,i=this._getShaderStage(e),s=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);if(r.has(i)===!1)r.add(i),i.usedTimes++;if(r.has(s)===!1)r.add(s),s.usedTimes++;return this}remove(t){let e=this.materialCache.get(t);for(let n of e)if(n.usedTimes--,n.usedTimes===0)this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);if(n===void 0)n=new Set,e.set(t,n);return n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);if(n===void 0)n=new km(t),e.set(t,n);return n}}class km{constructor(t){this.id=rM++,this.code=t,this.usedTimes=0}}function aM(t,e,n,i,s,r,a){let o=new Os,l=new zm,c=new Set,h=[],{logarithmicDepthBuffer:u,vertexTextures:d,precision:f}=s,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){if(c.add(S),S===0)return"uv";return`uv${S}`}function m(S,T,I,k,V){let B=k.fog,K=V.geometry,W=S.isMeshStandardMaterial?k.environment:null,nt=(S.isMeshStandardMaterial?n:e).get(S.envMap||W),G=!!nt&&nt.mapping===Ps?nt.image.height:null,ft=g[S.type];if(S.precision!==null){if(f=s.getMaxPrecision(S.precision),f!==S.precision)console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead.")}let pt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Dt=pt!==void 0?pt.length:0,Wt=0;if(K.morphAttributes.position!==void 0)Wt=1;if(K.morphAttributes.normal!==void 0)Wt=2;if(K.morphAttributes.color!==void 0)Wt=3;let de,jt,Z,mt;if(ft){let oe=Tn[ft];de=oe.vertexShader,jt=oe.fragmentShader}else de=S.vertexShader,jt=S.fragmentShader,l.update(S),Z=l.getVertexShaderID(S),mt=l.getFragmentShaderID(S);let ct=t.getRenderTarget(),bt=t.state.buffers.depth.getReversed(),Ut=V.isInstancedMesh===!0,zt=V.isBatchedMesh===!0,ae=!!S.map,P=!!S.matcap,tt=!!nt,Q=!!S.aoMap,J=!!S.lightMap,Y=!!S.bumpMap,ht=!!S.normalMap,ot=!!S.displacementMap,st=!!S.emissiveMap,Xt=!!S.metalnessMap,qt=!!S.roughnessMap,Zt=S.anisotropy>0,C=S.clearcoat>0,y=S.dispersion>0,U=S.iridescence>0,q=S.sheen>0,et=S.transmission>0,X=Zt&&!!S.anisotropyMap,St=C&&!!S.clearcoatMap,lt=C&&!!S.clearcoatNormalMap,wt=C&&!!S.clearcoatRoughnessMap,Nt=U&&!!S.iridescenceMap,at=U&&!!S.iridescenceThicknessMap,vt=q&&!!S.sheenColorMap,Rt=q&&!!S.sheenRoughnessMap,Pt=!!S.specularMap,yt=!!S.specularColorMap,$t=!!S.specularIntensityMap,D=et&&!!S.transmissionMap,_t=et&&!!S.thicknessMap,ut=!!S.gradientMap,Et=!!S.alphaMap,it=S.alphaTest>0,j=!!S.alphaHash,Ct=!!S.extensions,Gt=In;if(S.toneMapped){if(ct===null||ct.isXRRenderTarget===!0)Gt=t.toneMapping}let he={shaderID:ft,shaderType:S.type,shaderName:S.name,vertexShader:de,fragmentShader:jt,defines:S.defines,customVertexShaderID:Z,customFragmentShaderID:mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:zt,batchingColor:zt&&V._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&V.instanceColor!==null,instancingMorph:Ut&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ct===null?t.outputColorSpace:ct.isXRRenderTarget===!0?ct.texture.colorSpace:Us,alphaToCoverage:!!S.alphaToCoverage,map:ae,matcap:P,envMap:tt,envMapMode:tt&&nt.mapping,envMapCubeUVHeight:G,aoMap:Q,lightMap:J,bumpMap:Y,normalMap:ht,displacementMap:d&&ot,emissiveMap:st,normalMapObjectSpace:ht&&S.normalMapType===Zh,normalMapTangentSpace:ht&&S.normalMapType===Yh,metalnessMap:Xt,roughnessMap:qt,anisotropy:Zt,anisotropyMap:X,clearcoat:C,clearcoatMap:St,clearcoatNormalMap:lt,clearcoatRoughnessMap:wt,dispersion:y,iridescence:U,iridescenceMap:Nt,iridescenceThicknessMap:at,sheen:q,sheenColorMap:vt,sheenRoughnessMap:Rt,specularMap:Pt,specularColorMap:yt,specularIntensityMap:$t,transmission:et,transmissionMap:D,thicknessMap:_t,gradientMap:ut,opaque:S.transparent===!1&&S.blending===As&&S.alphaToCoverage===!1,alphaMap:Et,alphaTest:it,alphaHash:j,combine:S.combine,mapUv:ae&&_(S.map.channel),aoMapUv:Q&&_(S.aoMap.channel),lightMapUv:J&&_(S.lightMap.channel),bumpMapUv:Y&&_(S.bumpMap.channel),normalMapUv:ht&&_(S.normalMap.channel),displacementMapUv:ot&&_(S.displacementMap.channel),emissiveMapUv:st&&_(S.emissiveMap.channel),metalnessMapUv:Xt&&_(S.metalnessMap.channel),roughnessMapUv:qt&&_(S.roughnessMap.channel),anisotropyMapUv:X&&_(S.anisotropyMap.channel),clearcoatMapUv:St&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(S.sheenRoughnessMap.channel),specularMapUv:Pt&&_(S.specularMap.channel),specularColorMapUv:yt&&_(S.specularColorMap.channel),specularIntensityMapUv:$t&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:_t&&_(S.thicknessMap.channel),alphaMapUv:Et&&_(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(ht||Zt),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!K.attributes.uv&&(ae||Et),fog:!!B,useFog:S.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:S.flatShading===!0&&S.wireframe===!1,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:bt,skinning:V.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:Dt,morphTextureStride:Wt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:t.shadowMap.enabled&&I.length>0,shadowMapType:t.shadowMap.type,toneMapping:Gt,decodeVideoTexture:ae&&S.map.isVideoTexture===!0&&Kt.getTransfer(S.map.colorSpace)===re,decodeVideoTextureEmissive:st&&S.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(S.emissiveMap.colorSpace)===re,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Mn,flipSided:S.side===Ze,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ct&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&S.extensions.multiDraw===!0||zt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return he.vertexUv1s=c.has(1),he.vertexUv2s=c.has(2),he.vertexUv3s=c.has(3),c.clear(),he}function p(S){let T=[];if(S.shaderID)T.push(S.shaderID);else T.push(S.customVertexShaderID),T.push(S.customFragmentShaderID);if(S.defines!==void 0)for(let I in S.defines)T.push(I),T.push(S.defines[I]);if(S.isRawShaderMaterial===!1)v(T,S),x(T,S),T.push(t.outputColorSpace);return T.push(S.customProgramCacheKey),T.join()}function v(S,T){S.push(T.precision),S.push(T.outputColorSpace),S.push(T.envMapMode),S.push(T.envMapCubeUVHeight),S.push(T.mapUv),S.push(T.alphaMapUv),S.push(T.lightMapUv),S.push(T.aoMapUv),S.push(T.bumpMapUv),S.push(T.normalMapUv),S.push(T.displacementMapUv),S.push(T.emissiveMapUv),S.push(T.metalnessMapUv),S.push(T.roughnessMapUv),S.push(T.anisotropyMapUv),S.push(T.clearcoatMapUv),S.push(T.clearcoatNormalMapUv),S.push(T.clearcoatRoughnessMapUv),S.push(T.iridescenceMapUv),S.push(T.iridescenceThicknessMapUv),S.push(T.sheenColorMapUv),S.push(T.sheenRoughnessMapUv),S.push(T.specularMapUv),S.push(T.specularColorMapUv),S.push(T.specularIntensityMapUv),S.push(T.transmissionMapUv),S.push(T.thicknessMapUv),S.push(T.combine),S.push(T.fogExp2),S.push(T.sizeAttenuation),S.push(T.morphTargetsCount),S.push(T.morphAttributeCount),S.push(T.numDirLights),S.push(T.numPointLights),S.push(T.numSpotLights),S.push(T.numSpotLightMaps),S.push(T.numHemiLights),S.push(T.numRectAreaLights),S.push(T.numDirLightShadows),S.push(T.numPointLightShadows),S.push(T.numSpotLightShadows),S.push(T.numSpotLightShadowsWithMaps),S.push(T.numLightProbes),S.push(T.shadowMapType),S.push(T.toneMapping),S.push(T.numClippingPlanes),S.push(T.numClipIntersection),S.push(T.depthPacking)}function x(S,T){if(o.disableAll(),T.supportsVertexTextures)o.enable(0);if(T.instancing)o.enable(1);if(T.instancingColor)o.enable(2);if(T.instancingMorph)o.enable(3);if(T.matcap)o.enable(4);if(T.envMap)o.enable(5);if(T.normalMapObjectSpace)o.enable(6);if(T.normalMapTangentSpace)o.enable(7);if(T.clearcoat)o.enable(8);if(T.iridescence)o.enable(9);if(T.alphaTest)o.enable(10);if(T.vertexColors)o.enable(11);if(T.vertexAlphas)o.enable(12);if(T.vertexUv1s)o.enable(13);if(T.vertexUv2s)o.enable(14);if(T.vertexUv3s)o.enable(15);if(T.vertexTangents)o.enable(16);if(T.anisotropy)o.enable(17);if(T.alphaHash)o.enable(18);if(T.batching)o.enable(19);if(T.dispersion)o.enable(20);if(T.batchingColor)o.enable(21);if(T.gradientMap)o.enable(22);if(S.push(o.mask),o.disableAll(),T.fog)o.enable(0);if(T.useFog)o.enable(1);if(T.flatShading)o.enable(2);if(T.logarithmicDepthBuffer)o.enable(3);if(T.reversedDepthBuffer)o.enable(4);if(T.skinning)o.enable(5);if(T.morphTargets)o.enable(6);if(T.morphNormals)o.enable(7);if(T.morphColors)o.enable(8);if(T.premultipliedAlpha)o.enable(9);if(T.shadowMapEnabled)o.enable(10);if(T.doubleSided)o.enable(11);if(T.flipSided)o.enable(12);if(T.useDepthPacking)o.enable(13);if(T.dithering)o.enable(14);if(T.transmission)o.enable(15);if(T.sheen)o.enable(16);if(T.opaque)o.enable(17);if(T.pointsUvs)o.enable(18);if(T.decodeVideoTexture)o.enable(19);if(T.decodeVideoTextureEmissive)o.enable(20);if(T.alphaToCoverage)o.enable(21);S.push(o.mask)}function M(S){let T=g[S.type],I;if(T){let k=Tn[T];I=Ln.clone(k.uniforms)}else I=S.uniforms;return I}function R(S,T){let I;for(let k=0,V=h.length;k<V;k++){let B=h[k];if(B.cacheKey===T){I=B,++I.usedTimes;break}}if(I===void 0)I=new sM(t,T,S,r),h.push(I);return I}function w(S){if(--S.usedTimes===0){let T=h.indexOf(S);h[T]=h[h.length-1],h.pop(),S.destroy()}}function A(S){l.remove(S)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:h,dispose:L}}function oM(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);if(o===void 0)o={},t.set(a,o);return o}function i(a){t.delete(a)}function s(a,o,l){t.get(a)[o]=l}function r(){t=new WeakMap}return{has:e,get:n,remove:i,update:s,dispose:r}}function lM(t,e){if(t.groupOrder!==e.groupOrder)return t.groupOrder-e.groupOrder;else if(t.renderOrder!==e.renderOrder)return t.renderOrder-e.renderOrder;else if(t.material.id!==e.material.id)return t.material.id-e.material.id;else if(t.z!==e.z)return t.z-e.z;else return t.id-e.id}function Cm(t,e){if(t.groupOrder!==e.groupOrder)return t.groupOrder-e.groupOrder;else if(t.renderOrder!==e.renderOrder)return t.renderOrder-e.renderOrder;else if(t.z!==e.z)return e.z-t.z;else return t.id-e.id}function Rm(){let t=[],e=0,n=[],i=[],s=[];function r(){e=0,n.length=0,i.length=0,s.length=0}function a(u,d,f,g,_,m){let p=t[e];if(p===void 0)p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},t[e]=p;else p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m;return e++,p}function o(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);if(f.transmission>0)i.push(p);else if(f.transparent===!0)s.push(p);else n.push(p)}function l(u,d,f,g,_,m){let p=a(u,d,f,g,_,m);if(f.transmission>0)i.unshift(p);else if(f.transparent===!0)s.unshift(p);else n.unshift(p)}function c(u,d){if(n.length>1)n.sort(u||lM);if(i.length>1)i.sort(d||Cm);if(s.length>1)s.sort(d||Cm)}function h(){for(let u=e,d=t.length;u<d;u++){let f=t[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function cM(){let t=new WeakMap;function e(i,s){let r=t.get(i),a;if(r===void 0)a=new Rm,t.set(i,[a]);else if(s>=r.length)a=new Rm,r.push(a);else a=r[s];return a}function n(){t=new WeakMap}return{get:e,dispose:n}}function hM(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new E,color:new dt};break;case"SpotLight":n={position:new E,direction:new E,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new E,color:new dt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new E,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":n={color:new dt,position:new E,halfWidth:new E,halfHeight:new E};break}return t[e.id]=n,n}}}function uM(){let t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1000};break}return t[e.id]=n,n}}}var dM=0;function fM(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function pM(t){let e=new hM,n=uM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new E);let s=new E,r=new Bt,a=new Bt;function o(c){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,v=0,x=0,M=0,R=0,w=0,A=0;c.sort(fM);for(let S=0,T=c.length;S<T;S++){let I=c[S],{color:k,intensity:V,distance:B}=I,K=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=k.r*V,u+=k.g*V,d+=k.b*V;else if(I.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(I.sh.coefficients[W],V);A++}else if(I.isDirectionalLight){let W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let nt=I.shadow,G=n.get(I);G.shadowIntensity=nt.intensity,G.shadowBias=nt.bias,G.shadowNormalBias=nt.normalBias,G.shadowRadius=nt.radius,G.shadowMapSize=nt.mapSize,i.directionalShadow[f]=G,i.directionalShadowMap[f]=K,i.directionalShadowMatrix[f]=I.shadow.matrix,v++}i.directional[f]=W,f++}else if(I.isSpotLight){let W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(k).multiplyScalar(V),W.distance=B,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,i.spot[_]=W;let nt=I.shadow;if(I.map){if(i.spotLightMap[R]=I.map,R++,nt.updateMatrices(I),I.castShadow)w++}if(i.spotLightMatrix[_]=nt.matrix,I.castShadow){let G=n.get(I);G.shadowIntensity=nt.intensity,G.shadowBias=nt.bias,G.shadowNormalBias=nt.normalBias,G.shadowRadius=nt.radius,G.shadowMapSize=nt.mapSize,i.spotShadow[_]=G,i.spotShadowMap[_]=K,M++}_++}else if(I.isRectAreaLight){let W=e.get(I);W.color.copy(k).multiplyScalar(V),W.halfWidth.set(I.width*0.5,0,0),W.halfHeight.set(0,I.height*0.5,0),i.rectArea[m]=W,m++}else if(I.isPointLight){let W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){let nt=I.shadow,G=n.get(I);G.shadowIntensity=nt.intensity,G.shadowBias=nt.bias,G.shadowNormalBias=nt.normalBias,G.shadowRadius=nt.radius,G.shadowMapSize=nt.mapSize,G.shadowCameraNear=nt.camera.near,G.shadowCameraFar=nt.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=K,i.pointShadowMatrix[g]=I.shadow.matrix,x++}i.point[g]=W,g++}else if(I.isHemisphereLight){let W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(V),W.groundColor.copy(I.groundColor).multiplyScalar(V),i.hemi[p]=W,p++}}if(m>0)if(t.has("OES_texture_float_linear")===!0)i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2;else i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2;i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let L=i.hash;if(L.directionalLength!==f||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==m||L.hemiLength!==p||L.numDirectionalShadows!==v||L.numPointShadows!==x||L.numSpotShadows!==M||L.numSpotMaps!==R||L.numLightProbes!==A)i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+R-w,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=A,L.directionalLength=f,L.pointLength=g,L.spotLength=_,L.rectAreaLength=m,L.hemiLength=p,L.numDirectionalShadows=v,L.numPointShadows=x,L.numSpotShadows=M,L.numSpotMaps=R,L.numLightProbes=A,i.version=dM++}function l(c,h){let u=0,d=0,f=0,g=0,_=0,m=h.matrixWorldInverse;for(let p=0,v=c.length;p<v;p++){let x=c[p];if(x.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(x.isSpotLight){let M=i.spot[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),f++}else if(x.isRectAreaLight){let M=i.rectArea[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(x.width*0.5,0,0),M.halfHeight.set(0,x.height*0.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(x.isPointLight){let M=i.point[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){let M=i.hemi[_];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:i}}function Pm(t){let e=new pM(t),n=[],i=[];function s(h){c.camera=h,n.length=0,i.length=0}function r(h){n.push(h)}function a(h){i.push(h)}function o(){e.setup(n)}function l(h){e.setupView(n,h)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function mM(t){let e=new WeakMap;function n(s,r=0){let a=e.get(s),o;if(a===void 0)o=new Pm(t),e.set(s,[o]);else if(r>=a.length)o=new Pm(t),a.push(o);else o=a[r];return o}function i(){e=new WeakMap}return{get:n,dispose:i}}var gM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_M=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xM(t,e,n){let i=new ui,s=new H,r=new H,a=new ee,o=new Sa({depthPacking:qh}),l=new ba,c={},h=n.maxTextureSize,u={[Ni]:Ze,[Ze]:Ni,[Mn]:Mn},d=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:gM,fragmentShader:_M}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ht;g.setAttribute("position",new se(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let _=new pe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ao;let p=this.type;this.render=function(w,A,L){if(m.enabled===!1)return;if(m.autoUpdate===!1&&m.needsUpdate===!1)return;if(w.length===0)return;let S=t.getRenderTarget(),T=t.getActiveCubeFace(),I=t.getActiveMipmapLevel(),k=t.state;if(k.setBlending(Sn),k.buffers.depth.getReversed()===!0)k.buffers.color.setClear(0,0,0,0);else k.buffers.color.setClear(1,1,1,1);k.buffers.depth.setTest(!0),k.setScissorTest(!1);let V=p!==yn&&this.type===yn,B=p===yn&&this.type!==yn;for(let K=0,W=w.length;K<W;K++){let nt=w[K],G=nt.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let ft=G.getFrameExtents();if(s.multiply(ft),r.copy(G.mapSize),s.x>h||s.y>h){if(s.x>h)r.x=Math.floor(h/ft.x),s.x=r.x*ft.x,G.mapSize.x=r.x;if(s.y>h)r.y=Math.floor(h/ft.y),s.y=r.y*ft.y,G.mapSize.y=r.y}if(G.map===null||V===!0||B===!0){let Dt=this.type!==yn?{minFilter:Bi,magFilter:Bi}:{};if(G.map!==null)G.map.dispose();G.map=new De(s.x,s.y,Dt),G.map.texture.name=nt.name+".shadowMap",G.camera.updateProjectionMatrix()}t.setRenderTarget(G.map),t.clear();let pt=G.getViewportCount();for(let Dt=0;Dt<pt;Dt++){let Wt=G.getViewport(Dt);a.set(r.x*Wt.x,r.y*Wt.y,r.x*Wt.z,r.y*Wt.w),k.viewport(a),G.updateMatrices(nt,Dt),i=G.getFrustum(),M(A,L,G.camera,nt,this.type)}if(G.isPointLightShadow!==!0&&this.type===yn)v(G,L);G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(S,T,I)};function v(w,A){let L=e.update(_);if(d.defines.VSM_SAMPLES!==w.blurSamples)d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0;if(w.mapPass===null)w.mapPass=new De(s.x,s.y);d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(A,null,L,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(A,null,L,f,_,null)}function x(w,A,L,S){let T=null,I=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)T=I;else if(T=L.isPointLight===!0?l:o,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let k=T.uuid,V=A.uuid,B=c[k];if(B===void 0)B={},c[k]=B;let K=B[V];if(K===void 0)K=T.clone(),B[V]=K,A.addEventListener("dispose",R);T=K}if(T.visible=A.visible,T.wireframe=A.wireframe,S===yn)T.side=A.shadowSide!==null?A.shadowSide:A.side;else T.side=A.shadowSide!==null?A.shadowSide:u[A.side];if(T.alphaMap=A.alphaMap,T.alphaTest=A.alphaToCoverage===!0?0.5:A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let k=t.properties.get(T);k.light=L}return T}function M(w,A,L,S,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)){if((w.castShadow||w.receiveShadow&&T===yn)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);let V=e.update(w),B=w.material;if(Array.isArray(B)){let K=V.groups;for(let W=0,nt=K.length;W<nt;W++){let G=K[W],ft=B[G.materialIndex];if(ft&&ft.visible){let pt=x(w,ft,S,T);w.onBeforeShadow(t,w,A,L,V,pt,G),t.renderBufferDirect(L,null,V,pt,w,G),w.onAfterShadow(t,w,A,L,V,pt,G)}}}else if(B.visible){let K=x(w,B,S,T);w.onBeforeShadow(t,w,A,L,V,K,null),t.renderBufferDirect(L,null,V,K,w,null),w.onAfterShadow(t,w,A,L,V,K,null)}}}let k=w.children;for(let V=0,B=k.length;V<B;V++)M(k[V],A,L,S,T)}function R(w){w.target.removeEventListener("dispose",R);for(let L in c){let S=c[L],T=w.target.uuid;if(T in S)S[T].dispose(),delete S[T]}}}var vM={[Tr]:Er,[wr]:Rr,[Ar]:Pr,[Rs]:Cr,[Er]:Tr,[Rr]:wr,[Pr]:Ar,[Cr]:Rs};function yM(t,e){function n(){let D=!1,_t=new ee,ut=null,Et=new ee(0,0,0,0);return{setMask:function(it){if(ut!==it&&!D)t.colorMask(it,it,it,it),ut=it},setLocked:function(it){D=it},setClear:function(it,j,Ct,Gt,he){if(he===!0)it*=Gt,j*=Gt,Ct*=Gt;if(_t.set(it,j,Ct,Gt),Et.equals(_t)===!1)t.clearColor(it,j,Ct,Gt),Et.copy(_t)},reset:function(){D=!1,ut=null,Et.set(-1,0,0,0)}}}function i(){let D=!1,_t=!1,ut=null,Et=null,it=null;return{setReversed:function(j){if(_t!==j){let Ct=e.get("EXT_clip_control");if(j)Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT);else Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);_t=j;let Gt=it;it=null,this.setClear(Gt)}},getReversed:function(){return _t},setTest:function(j){if(j)ct(t.DEPTH_TEST);else bt(t.DEPTH_TEST)},setMask:function(j){if(ut!==j&&!D)t.depthMask(j),ut=j},setFunc:function(j){if(_t)j=vM[j];if(Et!==j){switch(j){case Tr:t.depthFunc(t.NEVER);break;case Er:t.depthFunc(t.ALWAYS);break;case wr:t.depthFunc(t.LESS);break;case Rs:t.depthFunc(t.LEQUAL);break;case Ar:t.depthFunc(t.EQUAL);break;case Cr:t.depthFunc(t.GEQUAL);break;case Rr:t.depthFunc(t.GREATER);break;case Pr:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Et=j}},setLocked:function(j){D=j},setClear:function(j){if(it!==j){if(_t)j=1-j;t.clearDepth(j),it=j}},reset:function(){D=!1,ut=null,Et=null,it=null,_t=!1}}}function s(){let D=!1,_t=null,ut=null,Et=null,it=null,j=null,Ct=null,Gt=null,he=null;return{setTest:function(oe){if(!D)if(oe)ct(t.STENCIL_TEST);else bt(t.STENCIL_TEST)},setMask:function(oe){if(_t!==oe&&!D)t.stencilMask(oe),_t=oe},setFunc:function(oe,En,wn){if(ut!==oe||Et!==En||it!==wn)t.stencilFunc(oe,En,wn),ut=oe,Et=En,it=wn},setOp:function(oe,En,wn){if(j!==oe||Ct!==En||Gt!==wn)t.stencilOp(oe,En,wn),j=oe,Ct=En,Gt=wn},setLocked:function(oe){D=oe},setClear:function(oe){if(he!==oe)t.clearStencil(oe),he=oe},reset:function(){D=!1,_t=null,ut=null,Et=null,it=null,j=null,Ct=null,Gt=null,he=null}}}let r=new n,a=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,x=null,M=null,R=null,w=null,A=new dt(0,0,0),L=0,S=!1,T=null,I=null,k=null,V=null,B=null,K=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,nt=0,G=t.getParameter(t.VERSION);if(G.indexOf("WebGL")!==-1)nt=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=nt>=1;else if(G.indexOf("OpenGL ES")!==-1)nt=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=nt>=2;let ft=null,pt={},Dt=t.getParameter(t.SCISSOR_BOX),Wt=t.getParameter(t.VIEWPORT),de=new ee().fromArray(Dt),jt=new ee().fromArray(Wt);function Z(D,_t,ut,Et){let it=new Uint8Array(4),j=t.createTexture();t.bindTexture(D,j),t.texParameteri(D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(D,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ct=0;Ct<ut;Ct++)if(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)t.texImage3D(_t,0,t.RGBA,1,1,Et,0,t.RGBA,t.UNSIGNED_BYTE,it);else t.texImage2D(_t+Ct,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,it);return j}let mt={};mt[t.TEXTURE_2D]=Z(t.TEXTURE_2D,t.TEXTURE_2D,1),mt[t.TEXTURE_CUBE_MAP]=Z(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[t.TEXTURE_2D_ARRAY]=Z(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),mt[t.TEXTURE_3D]=Z(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ct(t.DEPTH_TEST),a.setFunc(Rs),Y(!1),ht(wo),ct(t.CULL_FACE),Q(Sn);function ct(D){if(h[D]!==!0)t.enable(D),h[D]=!0}function bt(D){if(h[D]!==!1)t.disable(D),h[D]=!1}function Ut(D,_t){if(u[D]!==_t){if(t.bindFramebuffer(D,_t),u[D]=_t,D===t.DRAW_FRAMEBUFFER)u[t.FRAMEBUFFER]=_t;if(D===t.FRAMEBUFFER)u[t.DRAW_FRAMEBUFFER]=_t;return!0}return!1}function zt(D,_t){let ut=f,Et=!1;if(D){if(ut=d.get(_t),ut===void 0)ut=[],d.set(_t,ut);let it=D.textures;if(ut.length!==it.length||ut[0]!==t.COLOR_ATTACHMENT0){for(let j=0,Ct=it.length;j<Ct;j++)ut[j]=t.COLOR_ATTACHMENT0+j;ut.length=it.length,Et=!0}}else if(ut[0]!==t.BACK)ut[0]=t.BACK,Et=!0;if(Et)t.drawBuffers(ut)}function ae(D){if(g!==D)return t.useProgram(D),g=D,!0;return!1}let P={[Fi]:t.FUNC_ADD,[dh]:t.FUNC_SUBTRACT,[fh]:t.FUNC_REVERSE_SUBTRACT};P[ph]=t.MIN,P[mh]=t.MAX;let tt={[gh]:t.ZERO,[_h]:t.ONE,[xh]:t.SRC_COLOR,[yh]:t.SRC_ALPHA,[wh]:t.SRC_ALPHA_SATURATE,[Th]:t.DST_COLOR,[Sh]:t.DST_ALPHA,[vh]:t.ONE_MINUS_SRC_COLOR,[Mh]:t.ONE_MINUS_SRC_ALPHA,[Eh]:t.ONE_MINUS_DST_COLOR,[bh]:t.ONE_MINUS_DST_ALPHA,[Ah]:t.CONSTANT_COLOR,[Ch]:t.ONE_MINUS_CONSTANT_COLOR,[Rh]:t.CONSTANT_ALPHA,[Ph]:t.ONE_MINUS_CONSTANT_ALPHA};function Q(D,_t,ut,Et,it,j,Ct,Gt,he,oe){if(D===Sn){if(_===!0)bt(t.BLEND),_=!1;return}if(_===!1)ct(t.BLEND),_=!0;if(D!==uh){if(D!==m||oe!==S){if(p!==Fi||M!==Fi)t.blendEquation(t.FUNC_ADD),p=Fi,M=Fi;if(oe)switch(D){case As:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Cs:t.blendFunc(t.ONE,t.ONE);break;case Co:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ro:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case As:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Cs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Co:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ro:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,x=null,R=null,w=null,A.set(0,0,0),L=0,m=D,S=oe}return}if(it=it||_t,j=j||ut,Ct=Ct||Et,_t!==p||it!==M)t.blendEquationSeparate(P[_t],P[it]),p=_t,M=it;if(ut!==v||Et!==x||j!==R||Ct!==w)t.blendFuncSeparate(tt[ut],tt[Et],tt[j],tt[Ct]),v=ut,x=Et,R=j,w=Ct;if(Gt.equals(A)===!1||he!==L)t.blendColor(Gt.r,Gt.g,Gt.b,he),A.copy(Gt),L=he;m=D,S=!1}function J(D,_t){D.side===Mn?bt(t.CULL_FACE):ct(t.CULL_FACE);let ut=D.side===Ze;if(_t)ut=!ut;Y(ut),D.blending===As&&D.transparent===!1?Q(Sn):Q(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),r.setMask(D.colorWrite);let Et=D.stencilWrite;if(o.setTest(Et),Et)o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass);st(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ct(t.SAMPLE_ALPHA_TO_COVERAGE):bt(t.SAMPLE_ALPHA_TO_COVERAGE)}function Y(D){if(T!==D){if(D)t.frontFace(t.CW);else t.frontFace(t.CCW);T=D}}function ht(D){if(D!==lh){if(ct(t.CULL_FACE),D!==I)if(D===wo)t.cullFace(t.BACK);else if(D===ch)t.cullFace(t.FRONT);else t.cullFace(t.FRONT_AND_BACK)}else bt(t.CULL_FACE);I=D}function ot(D){if(D!==k){if(W)t.lineWidth(D);k=D}}function st(D,_t,ut){if(D){if(ct(t.POLYGON_OFFSET_FILL),V!==_t||B!==ut)t.polygonOffset(_t,ut),V=_t,B=ut}else bt(t.POLYGON_OFFSET_FILL)}function Xt(D){if(D)ct(t.SCISSOR_TEST);else bt(t.SCISSOR_TEST)}function qt(D){if(D===void 0)D=t.TEXTURE0+K-1;if(ft!==D)t.activeTexture(D),ft=D}function Zt(D,_t,ut){if(ut===void 0)if(ft===null)ut=t.TEXTURE0+K-1;else ut=ft;let Et=pt[ut];if(Et===void 0)Et={type:void 0,texture:void 0},pt[ut]=Et;if(Et.type!==D||Et.texture!==_t){if(ft!==ut)t.activeTexture(ut),ft=ut;t.bindTexture(D,_t||mt[D]),Et.type=D,Et.texture=_t}}function C(){let D=pt[ft];if(D!==void 0&&D.type!==void 0)t.bindTexture(D.type,null),D.type=void 0,D.texture=void 0}function y(){try{t.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function U(){try{t.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{t.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{t.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{t.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{t.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{t.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function wt(){try{t.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Nt(){try{t.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{t.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function vt(D){if(de.equals(D)===!1)t.scissor(D.x,D.y,D.z,D.w),de.copy(D)}function Rt(D){if(jt.equals(D)===!1)t.viewport(D.x,D.y,D.z,D.w),jt.copy(D)}function Pt(D,_t){let ut=c.get(_t);if(ut===void 0)ut=new WeakMap,c.set(_t,ut);let Et=ut.get(D);if(Et===void 0)Et=t.getUniformBlockIndex(_t,D.name),ut.set(D,Et)}function yt(D,_t){let Et=c.get(_t).get(D);if(l.get(_t)!==Et)t.uniformBlockBinding(_t,Et,D.__bindingPointIndex),l.set(_t,Et)}function $t(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},ft=null,pt={},u={},d=new WeakMap,f=[],g=null,_=!1,m=null,p=null,v=null,x=null,M=null,R=null,w=null,A=new dt(0,0,0),L=0,S=!1,T=null,I=null,k=null,V=null,B=null,de.set(0,0,t.canvas.width,t.canvas.height),jt.set(0,0,t.canvas.width,t.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ct,disable:bt,bindFramebuffer:Ut,drawBuffers:zt,useProgram:ae,setBlending:Q,setMaterial:J,setFlipSided:Y,setCullFace:ht,setLineWidth:ot,setPolygonOffset:st,setScissorTest:Xt,activeTexture:qt,bindTexture:Zt,unbindTexture:C,compressedTexImage2D:y,compressedTexImage3D:U,texImage2D:Nt,texImage3D:at,updateUBOMapping:Pt,uniformBlockBinding:yt,texStorage2D:lt,texStorage3D:wt,texSubImage2D:q,texSubImage3D:et,compressedTexSubImage2D:X,compressedTexSubImage3D:St,scissor:vt,viewport:Rt,reset:$t}}function MM(t,e,n,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new H,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(C){}function g(C,y){return f?new OffscreenCanvas(C,y):bs("canvas")}function _(C,y,U){let q=1,et=Zt(C);if(et.width>U||et.height>U)q=U/Math.max(et.width,et.height);if(q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let X=Math.floor(q*et.width),St=Math.floor(q*et.height);if(u===void 0)u=g(X,St);let lt=y?g(X,St):u;return lt.width=X,lt.height=St,lt.getContext("2d").drawImage(C,0,0,X,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+X+"x"+St+")."),lt}else{if("data"in C)console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+").");return C}return C}function m(C){return C.generateMipmaps}function p(C){t.generateMipmap(C)}function v(C){if(C.isWebGLCubeRenderTarget)return t.TEXTURE_CUBE_MAP;if(C.isWebGL3DRenderTarget)return t.TEXTURE_3D;if(C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture)return t.TEXTURE_2D_ARRAY;return t.TEXTURE_2D}function x(C,y,U,q,et=!1){if(C!==null){if(t[C]!==void 0)return t[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let X=y;if(y===t.RED){if(U===t.FLOAT)X=t.R32F;if(U===t.HALF_FLOAT)X=t.R16F;if(U===t.UNSIGNED_BYTE)X=t.R8}if(y===t.RED_INTEGER){if(U===t.UNSIGNED_BYTE)X=t.R8UI;if(U===t.UNSIGNED_SHORT)X=t.R16UI;if(U===t.UNSIGNED_INT)X=t.R32UI;if(U===t.BYTE)X=t.R8I;if(U===t.SHORT)X=t.R16I;if(U===t.INT)X=t.R32I}if(y===t.RG){if(U===t.FLOAT)X=t.RG32F;if(U===t.HALF_FLOAT)X=t.RG16F;if(U===t.UNSIGNED_BYTE)X=t.RG8}if(y===t.RG_INTEGER){if(U===t.UNSIGNED_BYTE)X=t.RG8UI;if(U===t.UNSIGNED_SHORT)X=t.RG16UI;if(U===t.UNSIGNED_INT)X=t.RG32UI;if(U===t.BYTE)X=t.RG8I;if(U===t.SHORT)X=t.RG16I;if(U===t.INT)X=t.RG32I}if(y===t.RGB_INTEGER){if(U===t.UNSIGNED_BYTE)X=t.RGB8UI;if(U===t.UNSIGNED_SHORT)X=t.RGB16UI;if(U===t.UNSIGNED_INT)X=t.RGB32UI;if(U===t.BYTE)X=t.RGB8I;if(U===t.SHORT)X=t.RGB16I;if(U===t.INT)X=t.RGB32I}if(y===t.RGBA_INTEGER){if(U===t.UNSIGNED_BYTE)X=t.RGBA8UI;if(U===t.UNSIGNED_SHORT)X=t.RGBA16UI;if(U===t.UNSIGNED_INT)X=t.RGBA32UI;if(U===t.BYTE)X=t.RGBA8I;if(U===t.SHORT)X=t.RGBA16I;if(U===t.INT)X=t.RGBA32I}if(y===t.RGB){if(U===t.UNSIGNED_INT_5_9_9_9_REV)X=t.RGB9_E5;if(U===t.UNSIGNED_INT_10F_11F_11F_REV)X=t.R11F_G11F_B10F}if(y===t.RGBA){let St=et?hl:Kt.getTransfer(q);if(U===t.FLOAT)X=t.RGBA32F;if(U===t.HALF_FLOAT)X=t.RGBA16F;if(U===t.UNSIGNED_BYTE)X=St===re?t.SRGB8_ALPHA8:t.RGBA8;if(U===t.UNSIGNED_SHORT_4_4_4_4)X=t.RGBA4;if(U===t.UNSIGNED_SHORT_5_5_5_1)X=t.RGB5_A1}if(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)e.get("EXT_color_buffer_float");return X}function M(C,y){let U;if(C){if(y===null||y===ki||y===Hi)U=t.DEPTH24_STENCIL8;else if(y===Yn)U=t.DEPTH32F_STENCIL8;else if(y===Ds)U=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(y===null||y===ki||y===Hi)U=t.DEPTH_COMPONENT24;else if(y===Yn)U=t.DEPTH_COMPONENT32F;else if(y===Ds)U=t.DEPTH_COMPONENT16;return U}function R(C,y){if(m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Bi&&C.minFilter!==li)return Math.log2(Math.max(y.width,y.height))+1;else if(C.mipmaps!==void 0&&C.mipmaps.length>0)return C.mipmaps.length;else if(C.isCompressedTexture&&Array.isArray(C.image))return y.mipmaps.length;else return 1}function w(C){let y=C.target;if(y.removeEventListener("dispose",w),L(y),y.isVideoTexture)h.delete(y)}function A(C){let y=C.target;y.removeEventListener("dispose",A),T(y)}function L(C){let y=i.get(C);if(y.__webglInit===void 0)return;let U=C.source,q=d.get(U);if(q){let et=q[y.__cacheKey];if(et.usedTimes--,et.usedTimes===0)S(C);if(Object.keys(q).length===0)d.delete(U)}i.remove(C)}function S(C){let y=i.get(C);t.deleteTexture(y.__webglTexture);let U=C.source,q=d.get(U);delete q[y.__cacheKey],a.memory.textures--}function T(C){let y=i.get(C);if(C.depthTexture)C.depthTexture.dispose(),i.remove(C.depthTexture);if(C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(y.__webglFramebuffer[q]))for(let et=0;et<y.__webglFramebuffer[q].length;et++)t.deleteFramebuffer(y.__webglFramebuffer[q][et]);else t.deleteFramebuffer(y.__webglFramebuffer[q]);if(y.__webglDepthbuffer)t.deleteRenderbuffer(y.__webglDepthbuffer[q])}else{if(Array.isArray(y.__webglFramebuffer))for(let q=0;q<y.__webglFramebuffer.length;q++)t.deleteFramebuffer(y.__webglFramebuffer[q]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer)t.deleteRenderbuffer(y.__webglDepthbuffer);if(y.__webglMultisampledFramebuffer)t.deleteFramebuffer(y.__webglMultisampledFramebuffer);if(y.__webglColorRenderbuffer){for(let q=0;q<y.__webglColorRenderbuffer.length;q++)if(y.__webglColorRenderbuffer[q])t.deleteRenderbuffer(y.__webglColorRenderbuffer[q])}if(y.__webglDepthRenderbuffer)t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let U=C.textures;for(let q=0,et=U.length;q<et;q++){let X=i.get(U[q]);if(X.__webglTexture)t.deleteTexture(X.__webglTexture),a.memory.textures--;i.remove(U[q])}i.remove(C)}let I=0;function k(){I=0}function V(){let C=I;if(C>=s.maxTextures)console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures);return I+=1,C}function B(C){let y=[];return y.push(C.wrapS),y.push(C.wrapT),y.push(C.wrapR||0),y.push(C.magFilter),y.push(C.minFilter),y.push(C.anisotropy),y.push(C.internalFormat),y.push(C.format),y.push(C.type),y.push(C.generateMipmaps),y.push(C.premultiplyAlpha),y.push(C.flipY),y.push(C.unpackAlignment),y.push(C.colorSpace),y.join()}function K(C,y){let U=i.get(C);if(C.isVideoTexture)Xt(C);if(C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&U.__version!==C.version){let q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{mt(U,C,y);return}}else if(C.isExternalTexture)U.__webglTexture=C.sourceTexture?C.sourceTexture:null;n.bindTexture(t.TEXTURE_2D,U.__webglTexture,t.TEXTURE0+y)}function W(C,y){let U=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&U.__version!==C.version){mt(U,C,y);return}n.bindTexture(t.TEXTURE_2D_ARRAY,U.__webglTexture,t.TEXTURE0+y)}function nt(C,y){let U=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&U.__version!==C.version){mt(U,C,y);return}n.bindTexture(t.TEXTURE_3D,U.__webglTexture,t.TEXTURE0+y)}function G(C,y){let U=i.get(C);if(C.version>0&&U.__version!==C.version){ct(U,C,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,U.__webglTexture,t.TEXTURE0+y)}let ft={[Uh]:t.REPEAT,[Nh]:t.CLAMP_TO_EDGE,[Fh]:t.MIRRORED_REPEAT},pt={[Bi]:t.NEAREST,[Oh]:t.NEAREST_MIPMAP_NEAREST,[Is]:t.NEAREST_MIPMAP_LINEAR,[li]:t.LINEAR,[kr]:t.LINEAR_MIPMAP_NEAREST,[zi]:t.LINEAR_MIPMAP_LINEAR},Dt={[$h]:t.NEVER,[nu]:t.ALWAYS,[Kh]:t.LESS,[ul]:t.LEQUAL,[Qh]:t.EQUAL,[eu]:t.GEQUAL,[jh]:t.GREATER,[tu]:t.NOTEQUAL};function Wt(C,y){if(y.type===Yn&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===li||y.magFilter===kr||y.magFilter===Is||y.magFilter===zi||y.minFilter===li||y.minFilter===kr||y.minFilter===Is||y.minFilter===zi))console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(t.texParameteri(C,t.TEXTURE_WRAP_S,ft[y.wrapS]),t.texParameteri(C,t.TEXTURE_WRAP_T,ft[y.wrapT]),C===t.TEXTURE_3D||C===t.TEXTURE_2D_ARRAY)t.texParameteri(C,t.TEXTURE_WRAP_R,ft[y.wrapR]);if(t.texParameteri(C,t.TEXTURE_MAG_FILTER,pt[y.magFilter]),t.texParameteri(C,t.TEXTURE_MIN_FILTER,pt[y.minFilter]),y.compareFunction)t.texParameteri(C,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(C,t.TEXTURE_COMPARE_FUNC,Dt[y.compareFunction]);if(e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Bi)return;if(y.minFilter!==Is&&y.minFilter!==zi)return;if(y.type===Yn&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let U=e.get("EXT_texture_filter_anisotropic");t.texParameterf(C,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function de(C,y){let U=!1;if(C.__webglInit===void 0)C.__webglInit=!0,y.addEventListener("dispose",w);let q=y.source,et=d.get(q);if(et===void 0)et={},d.set(q,et);let X=B(y);if(X!==C.__cacheKey){if(et[X]===void 0)et[X]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,U=!0;et[X].usedTimes++;let St=et[C.__cacheKey];if(St!==void 0){if(et[C.__cacheKey].usedTimes--,St.usedTimes===0)S(y)}C.__cacheKey=X,C.__webglTexture=et[X].texture}return U}function jt(C,y,U){return Math.floor(Math.floor(C/U)/y)}function Z(C,y,U,q){let X=C.updateRanges;if(X.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,y.width,y.height,U,q,y.data);else{X.sort((at,vt)=>at.start-vt.start);let St=0;for(let at=1;at<X.length;at++){let vt=X[St],Rt=X[at],Pt=vt.start+vt.count,yt=jt(Rt.start,y.width,4),$t=jt(vt.start,y.width,4);if(Rt.start<=Pt+1&&yt===$t&&jt(Rt.start+Rt.count-1,y.width,4)===yt)vt.count=Math.max(vt.count,Rt.start+Rt.count-vt.start);else++St,X[St]=Rt}X.length=St+1;let lt=t.getParameter(t.UNPACK_ROW_LENGTH),wt=t.getParameter(t.UNPACK_SKIP_PIXELS),Nt=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,y.width);for(let at=0,vt=X.length;at<vt;at++){let Rt=X[at],Pt=Math.floor(Rt.start/4),yt=Math.ceil(Rt.count/4),$t=Pt%y.width,D=Math.floor(Pt/y.width),_t=yt,ut=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,$t),t.pixelStorei(t.UNPACK_SKIP_ROWS,D),n.texSubImage2D(t.TEXTURE_2D,0,$t,D,_t,1,U,q,y.data)}C.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,lt),t.pixelStorei(t.UNPACK_SKIP_PIXELS,wt),t.pixelStorei(t.UNPACK_SKIP_ROWS,Nt)}}function mt(C,y,U){let q=t.TEXTURE_2D;if(y.isDataArrayTexture||y.isCompressedArrayTexture)q=t.TEXTURE_2D_ARRAY;if(y.isData3DTexture)q=t.TEXTURE_3D;let et=de(C,y),X=y.source;n.bindTexture(q,C.__webglTexture,t.TEXTURE0+U);let St=i.get(X);if(X.version!==St.__version||et===!0){n.activeTexture(t.TEXTURE0+U);let lt=Kt.getPrimaries(Kt.workingColorSpace),wt=y.colorSpace===ci?null:Kt.getPrimaries(y.colorSpace),Nt=y.colorSpace===ci||lt===wt?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);let at=_(y.image,!1,s.maxTextureSize);at=qt(y,at);let vt=r.convert(y.format,y.colorSpace),Rt=r.convert(y.type),Pt=x(y.internalFormat,vt,Rt,y.colorSpace,y.isVideoTexture);Wt(q,y);let yt,$t=y.mipmaps,D=y.isVideoTexture!==!0,_t=St.__version===void 0||et===!0,ut=X.dataReady,Et=R(y,at);if(y.isDepthTexture){if(Pt=M(y.format===Ls,y.type),_t)if(D)n.texStorage2D(t.TEXTURE_2D,1,Pt,at.width,at.height);else n.texImage2D(t.TEXTURE_2D,0,Pt,at.width,at.height,0,vt,Rt,null)}else if(y.isDataTexture)if($t.length>0){if(D&&_t)n.texStorage2D(t.TEXTURE_2D,Et,Pt,$t[0].width,$t[0].height);for(let it=0,j=$t.length;it<j;it++)if(yt=$t[it],D){if(ut)n.texSubImage2D(t.TEXTURE_2D,it,0,0,yt.width,yt.height,vt,Rt,yt.data)}else n.texImage2D(t.TEXTURE_2D,it,Pt,yt.width,yt.height,0,vt,Rt,yt.data);y.generateMipmaps=!1}else if(D){if(_t)n.texStorage2D(t.TEXTURE_2D,Et,Pt,at.width,at.height);if(ut)Z(y,at,vt,Rt)}else n.texImage2D(t.TEXTURE_2D,0,Pt,at.width,at.height,0,vt,Rt,at.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){if(D&&_t)n.texStorage3D(t.TEXTURE_2D_ARRAY,Et,Pt,$t[0].width,$t[0].height,at.depth);for(let it=0,j=$t.length;it<j;it++)if(yt=$t[it],y.format!==bn)if(vt!==null)if(D){if(ut)if(y.layerUpdates.size>0){let Ct=lc(yt.width,yt.height,y.format,y.type);for(let Gt of y.layerUpdates){let he=yt.data.subarray(Gt*Ct/yt.data.BYTES_PER_ELEMENT,(Gt+1)*Ct/yt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,it,0,0,Gt,yt.width,yt.height,1,vt,he)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,it,0,0,0,yt.width,yt.height,at.depth,vt,yt.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,it,Pt,yt.width,yt.height,at.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(D){if(ut)n.texSubImage3D(t.TEXTURE_2D_ARRAY,it,0,0,0,yt.width,yt.height,at.depth,vt,Rt,yt.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,it,Pt,yt.width,yt.height,at.depth,0,vt,Rt,yt.data)}else{if(D&&_t)n.texStorage2D(t.TEXTURE_2D,Et,Pt,$t[0].width,$t[0].height);for(let it=0,j=$t.length;it<j;it++)if(yt=$t[it],y.format!==bn)if(vt!==null)if(D){if(ut)n.compressedTexSubImage2D(t.TEXTURE_2D,it,0,0,yt.width,yt.height,vt,yt.data)}else n.compressedTexImage2D(t.TEXTURE_2D,it,Pt,yt.width,yt.height,0,yt.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(D){if(ut)n.texSubImage2D(t.TEXTURE_2D,it,0,0,yt.width,yt.height,vt,Rt,yt.data)}else n.texImage2D(t.TEXTURE_2D,it,Pt,yt.width,yt.height,0,vt,Rt,yt.data)}else if(y.isDataArrayTexture)if(D){if(_t)n.texStorage3D(t.TEXTURE_2D_ARRAY,Et,Pt,at.width,at.height,at.depth);if(ut)if(y.layerUpdates.size>0){let it=lc(at.width,at.height,y.format,y.type);for(let j of y.layerUpdates){let Ct=at.data.subarray(j*it/at.data.BYTES_PER_ELEMENT,(j+1)*it/at.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,j,at.width,at.height,1,vt,Rt,Ct)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,vt,Rt,at.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Pt,at.width,at.height,at.depth,0,vt,Rt,at.data);else if(y.isData3DTexture)if(D){if(_t)n.texStorage3D(t.TEXTURE_3D,Et,Pt,at.width,at.height,at.depth);if(ut)n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,vt,Rt,at.data)}else n.texImage3D(t.TEXTURE_3D,0,Pt,at.width,at.height,at.depth,0,vt,Rt,at.data);else if(y.isFramebufferTexture){if(_t)if(D)n.texStorage2D(t.TEXTURE_2D,Et,Pt,at.width,at.height);else{let it=at.width,j=at.height;for(let Ct=0;Ct<Et;Ct++)n.texImage2D(t.TEXTURE_2D,Ct,Pt,it,j,0,vt,Rt,null),it>>=1,j>>=1}}else if($t.length>0){if(D&&_t){let it=Zt($t[0]);n.texStorage2D(t.TEXTURE_2D,Et,Pt,it.width,it.height)}for(let it=0,j=$t.length;it<j;it++)if(yt=$t[it],D){if(ut)n.texSubImage2D(t.TEXTURE_2D,it,0,0,vt,Rt,yt)}else n.texImage2D(t.TEXTURE_2D,it,Pt,vt,Rt,yt);y.generateMipmaps=!1}else if(D){if(_t){let it=Zt(at);n.texStorage2D(t.TEXTURE_2D,Et,Pt,it.width,it.height)}if(ut)n.texSubImage2D(t.TEXTURE_2D,0,0,0,vt,Rt,at)}else n.texImage2D(t.TEXTURE_2D,0,Pt,vt,Rt,at);if(m(y))p(q);if(St.__version=X.version,y.onUpdate)y.onUpdate(y)}C.__version=y.version}function ct(C,y,U){if(y.image.length!==6)return;let q=de(C,y),et=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,C.__webglTexture,t.TEXTURE0+U);let X=i.get(et);if(et.version!==X.__version||q===!0){n.activeTexture(t.TEXTURE0+U);let St=Kt.getPrimaries(Kt.workingColorSpace),lt=y.colorSpace===ci?null:Kt.getPrimaries(y.colorSpace),wt=y.colorSpace===ci||St===lt?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);let Nt=y.isCompressedTexture||y.image[0].isCompressedTexture,at=y.image[0]&&y.image[0].isDataTexture,vt=[];for(let j=0;j<6;j++){if(!Nt&&!at)vt[j]=_(y.image[j],!0,s.maxCubemapSize);else vt[j]=at?y.image[j].image:y.image[j];vt[j]=qt(y,vt[j])}let Rt=vt[0],Pt=r.convert(y.format,y.colorSpace),yt=r.convert(y.type),$t=x(y.internalFormat,Pt,yt,y.colorSpace),D=y.isVideoTexture!==!0,_t=X.__version===void 0||q===!0,ut=et.dataReady,Et=R(y,Rt);Wt(t.TEXTURE_CUBE_MAP,y);let it;if(Nt){if(D&&_t)n.texStorage2D(t.TEXTURE_CUBE_MAP,Et,$t,Rt.width,Rt.height);for(let j=0;j<6;j++){it=vt[j].mipmaps;for(let Ct=0;Ct<it.length;Ct++){let Gt=it[Ct];if(y.format!==bn)if(Pt!==null)if(D){if(ut)n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Gt.width,Gt.height,Pt,Gt.data)}else n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,$t,Gt.width,Gt.height,0,Gt.data);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(D){if(ut)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,0,0,Gt.width,Gt.height,Pt,yt,Gt.data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct,$t,Gt.width,Gt.height,0,Pt,yt,Gt.data)}}}else{if(it=y.mipmaps,D&&_t){if(it.length>0)Et++;let j=Zt(vt[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Et,$t,j.width,j.height)}for(let j=0;j<6;j++)if(at){if(D){if(ut)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,vt[j].width,vt[j].height,Pt,yt,vt[j].data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$t,vt[j].width,vt[j].height,0,Pt,yt,vt[j].data);for(let Ct=0;Ct<it.length;Ct++){let he=it[Ct].image[j].image;if(D){if(ut)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,he.width,he.height,Pt,yt,he.data)}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,$t,he.width,he.height,0,Pt,yt,he.data)}}else{if(D){if(ut)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pt,yt,vt[j])}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,$t,Pt,yt,vt[j]);for(let Ct=0;Ct<it.length;Ct++){let Gt=it[Ct];if(D){if(ut)n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,0,0,Pt,yt,Gt.image[j])}else n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ct+1,$t,Pt,yt,Gt.image[j])}}}if(m(y))p(t.TEXTURE_CUBE_MAP);if(X.__version=et.version,y.onUpdate)y.onUpdate(y)}C.__version=y.version}function bt(C,y,U,q,et,X){let St=r.convert(U.format,U.colorSpace),lt=r.convert(U.type),wt=x(U.internalFormat,St,lt,U.colorSpace),Nt=i.get(y),at=i.get(U);if(at.__renderTarget=y,!Nt.__hasExternalTextures){let vt=Math.max(1,y.width>>X),Rt=Math.max(1,y.height>>X);if(et===t.TEXTURE_3D||et===t.TEXTURE_2D_ARRAY)n.texImage3D(et,X,wt,vt,Rt,y.depth,0,St,lt,null);else n.texImage2D(et,X,wt,vt,Rt,0,St,lt,null)}if(n.bindFramebuffer(t.FRAMEBUFFER,C),st(y))o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,et,at.__webglTexture,0,ot(y));else if(et===t.TEXTURE_2D||et>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)t.framebufferTexture2D(t.FRAMEBUFFER,q,et,at.__webglTexture,X);n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ut(C,y,U){if(t.bindRenderbuffer(t.RENDERBUFFER,C),y.depthBuffer){let q=y.depthTexture,et=q&&q.isDepthTexture?q.type:null,X=M(y.stencilBuffer,et),St=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,lt=ot(y);if(st(y))o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,lt,X,y.width,y.height);else if(U)t.renderbufferStorageMultisample(t.RENDERBUFFER,lt,X,y.width,y.height);else t.renderbufferStorage(t.RENDERBUFFER,X,y.width,y.height);t.framebufferRenderbuffer(t.FRAMEBUFFER,St,t.RENDERBUFFER,C)}else{let q=y.textures;for(let et=0;et<q.length;et++){let X=q[et],St=r.convert(X.format,X.colorSpace),lt=r.convert(X.type),wt=x(X.internalFormat,St,lt,X.colorSpace),Nt=ot(y);if(U&&st(y)===!1)t.renderbufferStorageMultisample(t.RENDERBUFFER,Nt,wt,y.width,y.height);else if(st(y))o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Nt,wt,y.width,y.height);else t.renderbufferStorage(t.RENDERBUFFER,wt,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function zt(C,y){if(y&&y.isWebGLCubeRenderTarget)throw Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,C),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(y.depthTexture);if(q.__renderTarget=y,!q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0;K(y.depthTexture,0);let et=q.__webglTexture,X=ot(y);if(y.depthTexture.format===Hr)if(st(y))o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,et,0,X);else t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,et,0);else if(y.depthTexture.format===Ls)if(st(y))o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,et,0,X);else t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,et,0);else throw Error("Unknown depthTexture format")}function ae(C){let y=i.get(C),U=C.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==C.depthTexture){let q=C.depthTexture;if(y.__depthDisposeCallback)y.__depthDisposeCallback();if(q){let et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,q.removeEventListener("dispose",et)};q.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=q}if(C.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw Error("target.depthTexture not supported in Cube render targets");let q=C.texture.mipmaps;if(q&&q.length>0)zt(y.__webglFramebuffer[0],C);else zt(y.__webglFramebuffer,C)}else if(U){y.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[q]),y.__webglDepthbuffer[q]===void 0)y.__webglDepthbuffer[q]=t.createRenderbuffer(),Ut(y.__webglDepthbuffer[q],C,!1);else{let et=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer[q];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,et,t.RENDERBUFFER,X)}}else{let q=C.texture.mipmaps;if(q&&q.length>0)n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[0]);else n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer);if(y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),Ut(y.__webglDepthbuffer,C,!1);else{let et=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,et,t.RENDERBUFFER,X)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function P(C,y,U){let q=i.get(C);if(y!==void 0)bt(q.__webglFramebuffer,C,C.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0);if(U!==void 0)ae(C)}function tt(C){let y=C.texture,U=i.get(C),q=i.get(y);C.addEventListener("dispose",A);let et=C.textures,X=C.isWebGLCubeRenderTarget===!0,St=et.length>1;if(!St){if(q.__webglTexture===void 0)q.__webglTexture=t.createTexture();q.__version=y.version,a.memory.textures++}if(X){U.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[lt]=[];for(let wt=0;wt<y.mipmaps.length;wt++)U.__webglFramebuffer[lt][wt]=t.createFramebuffer()}else U.__webglFramebuffer[lt]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)U.__webglFramebuffer[lt]=t.createFramebuffer()}else U.__webglFramebuffer=t.createFramebuffer();if(St)for(let lt=0,wt=et.length;lt<wt;lt++){let Nt=i.get(et[lt]);if(Nt.__webglTexture===void 0)Nt.__webglTexture=t.createTexture(),a.memory.textures++}if(C.samples>0&&st(C)===!1){U.__webglMultisampledFramebuffer=t.createFramebuffer(),U.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){let wt=et[lt];U.__webglColorRenderbuffer[lt]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,U.__webglColorRenderbuffer[lt]);let Nt=r.convert(wt.format,wt.colorSpace),at=r.convert(wt.type),vt=x(wt.internalFormat,Nt,at,wt.colorSpace,C.isXRRenderTarget===!0),Rt=ot(C);t.renderbufferStorageMultisample(t.RENDERBUFFER,Rt,vt,C.width,C.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+lt,t.RENDERBUFFER,U.__webglColorRenderbuffer[lt])}if(t.bindRenderbuffer(t.RENDERBUFFER,null),C.depthBuffer)U.__webglDepthRenderbuffer=t.createRenderbuffer(),Ut(U.__webglDepthRenderbuffer,C,!0);n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,q.__webglTexture),Wt(t.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let wt=0;wt<y.mipmaps.length;wt++)bt(U.__webglFramebuffer[lt][wt],C,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+lt,wt);else bt(U.__webglFramebuffer[lt],C,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);if(m(y))p(t.TEXTURE_CUBE_MAP);n.unbindTexture()}else if(St){for(let lt=0,wt=et.length;lt<wt;lt++){let Nt=et[lt],at=i.get(Nt),vt=t.TEXTURE_2D;if(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)vt=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY;if(n.bindTexture(vt,at.__webglTexture),Wt(vt,Nt),bt(U.__webglFramebuffer,C,Nt,t.COLOR_ATTACHMENT0+lt,vt,0),m(Nt))p(vt)}n.unbindTexture()}else{let lt=t.TEXTURE_2D;if(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)lt=C.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY;if(n.bindTexture(lt,q.__webglTexture),Wt(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let wt=0;wt<y.mipmaps.length;wt++)bt(U.__webglFramebuffer[wt],C,y,t.COLOR_ATTACHMENT0,lt,wt);else bt(U.__webglFramebuffer,C,y,t.COLOR_ATTACHMENT0,lt,0);if(m(y))p(lt);n.unbindTexture()}if(C.depthBuffer)ae(C)}function Q(C){let y=C.textures;for(let U=0,q=y.length;U<q;U++){let et=y[U];if(m(et)){let X=v(C),St=i.get(et).__webglTexture;n.bindTexture(X,St),p(X),n.unbindTexture()}}}let J=[],Y=[];function ht(C){if(C.samples>0){if(st(C)===!1){let{textures:y,width:U,height:q}=C,et=t.COLOR_BUFFER_BIT,X=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,St=i.get(C),lt=y.length>1;if(lt)for(let Nt=0;Nt<y.length;Nt++)n.bindFramebuffer(t.FRAMEBUFFER,St.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Nt,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,St.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Nt,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let wt=C.texture.mipmaps;if(wt&&wt.length>0)n.bindFramebuffer(t.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]);else n.bindFramebuffer(t.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let Nt=0;Nt<y.length;Nt++){if(C.resolveDepthBuffer){if(C.depthBuffer)et|=t.DEPTH_BUFFER_BIT;if(C.stencilBuffer&&C.resolveStencilBuffer)et|=t.STENCIL_BUFFER_BIT}if(lt){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,St.__webglColorRenderbuffer[Nt]);let at=i.get(y[Nt]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,at,0)}if(t.blitFramebuffer(0,0,U,q,0,0,U,q,et,t.NEAREST),l===!0){if(J.length=0,Y.length=0,J.push(t.COLOR_ATTACHMENT0+Nt),C.depthBuffer&&C.resolveDepthBuffer===!1)J.push(X),Y.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Y);t.invalidateFramebuffer(t.READ_FRAMEBUFFER,J)}}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),lt)for(let Nt=0;Nt<y.length;Nt++){n.bindFramebuffer(t.FRAMEBUFFER,St.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Nt,t.RENDERBUFFER,St.__webglColorRenderbuffer[Nt]);let at=i.get(y[Nt]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,St.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Nt,t.TEXTURE_2D,at,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let y=C.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function ot(C){return Math.min(s.maxSamples,C.samples)}function st(C){let y=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Xt(C){let y=a.render.frame;if(h.get(C)!==y)h.set(C,y),C.update()}function qt(C,y){let{colorSpace:U,format:q,type:et}=C;if(C.isCompressedTexture===!0||C.isVideoTexture===!0)return y;if(U!==Us&&U!==ci)if(Kt.getTransfer(U)===re){if(q!==bn||et!==qn)console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else console.error("THREE.WebGLTextures: Unsupported texture color space:",U);return y}function Zt(C){if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement)c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height;else if(typeof VideoFrame<"u"&&C instanceof VideoFrame)c.width=C.displayWidth,c.height=C.displayHeight;else c.width=C.width,c.height=C.height;return c}this.allocateTextureUnit=V,this.resetTextureUnits=k,this.setTexture2D=K,this.setTexture2DArray=W,this.setTexture3D=nt,this.setTextureCube=G,this.rebindTextures=P,this.setupRenderTarget=tt,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=ht,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=bt,this.useMultisampledRTT=st}function Hm(t,e){function n(i,s=ci){let r,a=Kt.getTransfer(s);if(i===qn)return t.UNSIGNED_BYTE;if(i===Io)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Do)return t.UNSIGNED_SHORT_5_5_5_1;if(i===kh)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Hh)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Bh)return t.BYTE;if(i===zh)return t.SHORT;if(i===Ds)return t.UNSIGNED_SHORT;if(i===Po)return t.INT;if(i===ki)return t.UNSIGNED_INT;if(i===Yn)return t.FLOAT;if(i===hn)return t.HALF_FLOAT;if(i===Gh)return t.ALPHA;if(i===Vh)return t.RGB;if(i===bn)return t.RGBA;if(i===Hr)return t.DEPTH_COMPONENT;if(i===Ls)return t.DEPTH_STENCIL;if(i===Wh)return t.RED;if(i===Lo)return t.RED_INTEGER;if(i===Xh)return t.RG;if(i===Uo)return t.RG_INTEGER;if(i===No)return t.RGBA_INTEGER;if(i===Gr||i===Vr||i===Wr||i===Xr)if(a===re)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Gr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Gr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Fo||i===Oo||i===Bo||i===zo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Oo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===zo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ko||i===Ho||i===Go)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ko||i===Ho)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Go)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Vo||i===Wo||i===Xo||i===qo||i===Yo||i===Zo||i===Jo||i===$o||i===Ko||i===Qo||i===jo||i===tl||i===el||i===nl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Vo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Wo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===$o)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ko)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===jo)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===tl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===el)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===nl)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===il||i===sl||i===rl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===il)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===rl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===al||i===ol||i===ll||i===cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===al)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(i===Hi)return t.UNSIGNED_INT_24_8;return t[i]!==void 0?t[i]:null}return{convert:n}}var SM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Gm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ia(t.texture);if(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)this.depthNear=t.depthNear,this.depthFar=t.depthFar;this.texture=n}}getMesh(t){if(this.texture!==null){if(this.mesh===null){let e=t.cameras[0].viewport,n=new Se({vertexShader:SM,fragmentShader:bM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new pe(new Wi(20,20),n)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Vm extends un{constructor(t,e){super();let n=this,i=null,s=1,r=null,a="local-floor",o=1,l=null,c=null,h=null,u=null,d=null,f=null,g=typeof XRWebGLBinding<"u",_=new Gm,m={},p=e.getContextAttributes(),v=null,x=null,M=[],R=[],w=new H,A=null,L=new Te;L.viewport=new ee;let S=new Te;S.viewport=new ee;let T=[L,S],I=new nc,k=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let mt=M[Z];if(mt===void 0)mt=new zs,M[Z]=mt;return mt.getTargetRaySpace()},this.getControllerGrip=function(Z){let mt=M[Z];if(mt===void 0)mt=new zs,M[Z]=mt;return mt.getGripSpace()},this.getHand=function(Z){let mt=M[Z];if(mt===void 0)mt=new zs,M[Z]=mt;return mt.getHandSpace()};function B(Z){let mt=R.indexOf(Z.inputSource);if(mt===-1)return;let ct=M[mt];if(ct!==void 0)ct.update(Z.inputSource,Z.frame,l||r),ct.dispatchEvent({type:Z.type,data:Z.inputSource})}function K(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",W);for(let Z=0;Z<M.length;Z++){let mt=R[Z];if(mt===null)continue;R[Z]=null,M[Z].disconnect(mt)}k=null,V=null,_.reset();for(let Z in m)delete m[Z];t.setRenderTarget(v),d=null,u=null,h=null,i=null,x=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){if(s=Z,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){if(a=Z,n.isPresenting===!0)console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(Z){l=Z},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){if(h===null&&g)h=new XRWebGLBinding(i,e);return h},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(v=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",K),i.addEventListener("inputsourceschange",W),p.xrCompatible!==!0)await e.makeXRCompatible();if(A=t.getPixelRatio(),t.getSize(w),!(g&&("createProjectionLayer"in XRWebGLBinding.prototype))){let ct={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,ct),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new De(d.framebufferWidth,d.framebufferHeight,{format:bn,type:qn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let ct=null,bt=null,Ut=null;if(p.depth)Ut=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=p.stencil?Ls:Hr,bt=p.stencil?Hi:ki;let zt={colorFormat:e.RGBA8,depthFormat:Ut,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(zt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new De(u.textureWidth,u.textureHeight,{format:bn,type:qn,depthTexture:new na(u.textureWidth,u.textureHeight,bt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(o),l=null,r=await i.requestReferenceSpace(a),jt.setContext(i),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W(Z){for(let mt=0;mt<Z.removed.length;mt++){let ct=Z.removed[mt],bt=R.indexOf(ct);if(bt>=0)R[bt]=null,M[bt].disconnect(ct)}for(let mt=0;mt<Z.added.length;mt++){let ct=Z.added[mt],bt=R.indexOf(ct);if(bt===-1){for(let zt=0;zt<M.length;zt++)if(zt>=R.length){R.push(ct),bt=zt;break}else if(R[zt]===null){R[zt]=ct,bt=zt;break}if(bt===-1)break}let Ut=M[bt];if(Ut)Ut.connect(ct)}}let nt=new E,G=new E;function ft(Z,mt,ct){nt.setFromMatrixPosition(mt.matrixWorld),G.setFromMatrixPosition(ct.matrixWorld);let bt=nt.distanceTo(G),Ut=mt.projectionMatrix.elements,zt=ct.projectionMatrix.elements,ae=Ut[14]/(Ut[10]-1),P=Ut[14]/(Ut[10]+1),tt=(Ut[9]+1)/Ut[5],Q=(Ut[9]-1)/Ut[5],J=(Ut[8]-1)/Ut[0],Y=(zt[8]+1)/zt[0],ht=ae*J,ot=ae*Y,st=bt/(-J+Y),Xt=st*-J;if(mt.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Xt),Z.translateZ(st),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),Ut[10]===-1)Z.projectionMatrix.copy(mt.projectionMatrix),Z.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{let qt=ae+st,Zt=P+st,C=ht-Xt,y=ot+(bt-Xt),U=tt*P/Zt*qt,q=Q*P/Zt*qt;Z.projectionMatrix.makePerspective(C,y,U,q,qt,Zt),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function pt(Z,mt){if(mt===null)Z.matrixWorld.copy(Z.matrix);else Z.matrixWorld.multiplyMatrices(mt.matrixWorld,Z.matrix);Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let{near:mt,far:ct}=Z;if(_.texture!==null){if(_.depthNear>0)mt=_.depthNear;if(_.depthFar>0)ct=_.depthFar}if(I.near=S.near=L.near=mt,I.far=S.far=L.far=ct,k!==I.near||V!==I.far)i.updateRenderState({depthNear:I.near,depthFar:I.far}),k=I.near,V=I.far;I.layers.mask=Z.layers.mask|6,L.layers.mask=I.layers.mask&3,S.layers.mask=I.layers.mask&5;let bt=Z.parent,Ut=I.cameras;pt(I,bt);for(let zt=0;zt<Ut.length;zt++)pt(Ut[zt],bt);if(Ut.length===2)ft(I,L,S);else I.projectionMatrix.copy(L.projectionMatrix);Dt(Z,I,bt)};function Dt(Z,mt,ct){if(ct===null)Z.matrix.copy(mt.matrixWorld);else Z.matrix.copy(ct.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(mt.matrixWorld);if(Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(mt.projectionMatrix),Z.projectionMatrixInverse.copy(mt.projectionMatrixInverse),Z.isPerspectiveCamera)Z.fov=Ri*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1}this.getCamera=function(){return I},this.getFoveation=function(){if(u===null&&d===null)return;return o},this.setFoveation=function(Z){if(o=Z,u!==null)u.fixedFoveation=Z;if(d!==null&&d.fixedFoveation!==void 0)d.fixedFoveation=Z},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(Z){return m[Z]};let Wt=null;function de(Z,mt){if(c=mt.getViewerPose(l||r),f=mt,c!==null){let ct=c.views;if(d!==null)t.setRenderTargetFramebuffer(x,d.framebuffer),t.setRenderTarget(x);let bt=!1;if(ct.length!==I.cameras.length)I.cameras.length=0,bt=!0;for(let P=0;P<ct.length;P++){let tt=ct[P],Q=null;if(d!==null)Q=d.getViewport(tt);else{let Y=h.getViewSubImage(u,tt);if(Q=Y.viewport,P===0)t.setRenderTargetTextures(x,Y.colorTexture,Y.depthStencilTexture),t.setRenderTarget(x)}let J=T[P];if(J===void 0)J=new Te,J.layers.enable(P),J.viewport=new ee,T[P]=J;if(J.matrix.fromArray(tt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(tt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Q.x,Q.y,Q.width,Q.height),P===0)I.matrix.copy(J.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale);if(bt===!0)I.cameras.push(J)}let Ut=i.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){h=n.getBinding();let P=h.getDepthInformation(ct[0]);if(P&&P.isValid&&P.texture)_.init(P,i.renderState)}if(Ut&&Ut.includes("camera-access")&&g){t.state.unbindTexture(),h=n.getBinding();for(let P=0;P<ct.length;P++){let tt=ct[P].camera;if(tt){let Q=m[tt];if(!Q)Q=new ia,m[tt]=Q;let J=h.getCameraImage(tt);Q.sourceTexture=J}}}}for(let ct=0;ct<M.length;ct++){let bt=R[ct],Ut=M[ct];if(bt!==null&&Ut!==void 0)Ut.update(bt,mt,l||r)}if(Wt)Wt(Z,mt);if(mt.detectedPlanes)n.dispatchEvent({type:"planesdetected",data:mt});f=null}let jt=new Im;jt.setAnimationLoop(de),this.setAnimationLoop=function(Z){Wt=Z},this.dispose=function(){}}}var Ji=new Be,TM=new Bt;function EM(t,e){function n(m,p){if(m.matrixAutoUpdate===!0)m.updateMatrix();p.value.copy(m.matrix)}function i(m,p){if(p.color.getRGB(m.fogColor.value,mu(t)),p.isFog)m.fogNear.value=p.near,m.fogFar.value=p.far;else if(p.isFogExp2)m.fogDensity.value=p.density}function s(m,p,v,x,M){if(p.isMeshBasicMaterial)r(m,p);else if(p.isMeshLambertMaterial)r(m,p);else if(p.isMeshToonMaterial)r(m,p),u(m,p);else if(p.isMeshPhongMaterial)r(m,p),h(m,p);else if(p.isMeshStandardMaterial){if(r(m,p),d(m,p),p.isMeshPhysicalMaterial)f(m,p,M)}else if(p.isMeshMatcapMaterial)r(m,p),g(m,p);else if(p.isMeshDepthMaterial)r(m,p);else if(p.isMeshDistanceMaterial)r(m,p),_(m,p);else if(p.isMeshNormalMaterial)r(m,p);else if(p.isLineBasicMaterial){if(a(m,p),p.isLineDashedMaterial)o(m,p)}else if(p.isPointsMaterial)l(m,p,v,x);else if(p.isSpriteMaterial)c(m,p);else if(p.isShadowMaterial)m.color.value.copy(p.color),m.opacity.value=p.opacity;else if(p.isShaderMaterial)p.uniformsNeedUpdate=!1}function r(m,p){if(m.opacity.value=p.opacity,p.color)m.diffuse.value.copy(p.color);if(p.emissive)m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity);if(p.map)m.map.value=p.map,n(p.map,m.mapTransform);if(p.alphaMap)m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform);if(p.bumpMap){if(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ze)m.bumpScale.value*=-1}if(p.normalMap){if(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ze)m.normalScale.value.negate()}if(p.displacementMap)m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias;if(p.emissiveMap)m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform);if(p.specularMap)m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform);if(p.alphaTest>0)m.alphaTest.value=p.alphaTest;let v=e.get(p),{envMap:x,envMapRotation:M}=v;if(x){if(m.envMap.value=x,Ji.copy(M),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1)Ji.y*=-1,Ji.z*=-1;m.envMapRotation.value.setFromMatrix4(TM.makeRotationFromEuler(Ji)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio}if(p.lightMap)m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform);if(p.aoMap)m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform)}function a(m,p){if(m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map)m.map.value=p.map,n(p.map,m.mapTransform)}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,v,x){if(m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=x*0.5,p.map)m.map.value=p.map,n(p.map,m.uvTransform);if(p.alphaMap)m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform);if(p.alphaTest>0)m.alphaTest.value=p.alphaTest}function c(m,p){if(m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map)m.map.value=p.map,n(p.map,m.mapTransform);if(p.alphaMap)m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform);if(p.alphaTest>0)m.alphaTest.value=p.alphaTest}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,0.0001)}function u(m,p){if(p.gradientMap)m.gradientMap.value=p.gradientMap}function d(m,p){if(m.metalness.value=p.metalness,p.metalnessMap)m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform);if(m.roughness.value=p.roughness,p.roughnessMap)m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform);if(p.envMap)m.envMapIntensity.value=p.envMapIntensity}function f(m,p,v){if(m.ior.value=p.ior,p.sheen>0){if(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap)m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform);if(p.sheenRoughnessMap)m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform)}if(p.clearcoat>0){if(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap)m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform);if(p.clearcoatRoughnessMap)m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform);if(p.clearcoatNormalMap){if(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ze)m.clearcoatNormalScale.value.negate()}}if(p.dispersion>0)m.dispersion.value=p.dispersion;if(p.iridescence>0){if(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap)m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform);if(p.iridescenceThicknessMap)m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform)}if(p.transmission>0){if(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap)m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform);if(m.thickness.value=p.thickness,p.thicknessMap)m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform);m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)}if(p.anisotropy>0){if(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap)m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform)}if(m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap)m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform);if(p.specularIntensityMap)m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform)}function g(m,p){if(p.matcap)m.matcap.value=p.matcap}function _(m,p){let v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function wM(t,e,n,i){let s={},r={},a=[],o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,x){let M=x.program;i.uniformBlockBinding(v,M)}function c(v,x){let M=s[v.id];if(M===void 0)g(v),M=h(v),s[v.id]=M,v.addEventListener("dispose",m);let R=x.program;i.updateUBOMapping(v,R);let w=e.render.frame;if(r[v.id]!==w)d(v),r[v.id]=w}function h(v){let x=u();v.__bindingPointIndex=x;let M=t.createBuffer(),{__size:R,usage:w}=v;return t.bindBuffer(t.UNIFORM_BUFFER,M),t.bufferData(t.UNIFORM_BUFFER,R,w),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,x,M),M}function u(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let x=s[v.id],{uniforms:M,__cache:R}=v;t.bindBuffer(t.UNIFORM_BUFFER,x);for(let w=0,A=M.length;w<A;w++){let L=Array.isArray(M[w])?M[w]:[M[w]];for(let S=0,T=L.length;S<T;S++){let I=L[S];if(f(I,w,S,R)===!0){let k=I.__offset,V=Array.isArray(I.value)?I.value:[I.value],B=0;for(let K=0;K<V.length;K++){let W=V[K],nt=_(W);if(typeof W==="number"||typeof W==="boolean")I.__data[0]=W,t.bufferSubData(t.UNIFORM_BUFFER,k+B,I.__data);else if(W.isMatrix3)I.__data[0]=W.elements[0],I.__data[1]=W.elements[1],I.__data[2]=W.elements[2],I.__data[3]=0,I.__data[4]=W.elements[3],I.__data[5]=W.elements[4],I.__data[6]=W.elements[5],I.__data[7]=0,I.__data[8]=W.elements[6],I.__data[9]=W.elements[7],I.__data[10]=W.elements[8],I.__data[11]=0;else W.toArray(I.__data,B),B+=nt.storage/Float32Array.BYTES_PER_ELEMENT}t.bufferSubData(t.UNIFORM_BUFFER,k,I.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function f(v,x,M,R){let w=v.value,A=x+"_"+M;if(R[A]===void 0){if(typeof w==="number"||typeof w==="boolean")R[A]=w;else R[A]=w.clone();return!0}else{let L=R[A];if(typeof w==="number"||typeof w==="boolean"){if(L!==w)return R[A]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function g(v){let x=v.uniforms,M=0,R=16;for(let A=0,L=x.length;A<L;A++){let S=Array.isArray(x[A])?x[A]:[x[A]];for(let T=0,I=S.length;T<I;T++){let k=S[T],V=Array.isArray(k.value)?k.value:[k.value];for(let B=0,K=V.length;B<K;B++){let W=V[B],nt=_(W),G=M%R,ft=G%nt.boundary,pt=G+ft;if(M+=ft,pt!==0&&R-pt<nt.storage)M+=R-pt;k.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=nt.storage}}}let w=M%R;if(w>0)M+=R-w;return v.__size=M,v.__cache={},this}function _(v){let x={boundary:0,storage:0};if(typeof v==="number"||typeof v==="boolean")x.boundary=4,x.storage=4;else if(v.isVector2)x.boundary=8,x.storage=8;else if(v.isVector3||v.isColor)x.boundary=16,x.storage=12;else if(v.isVector4)x.boundary=16,x.storage=16;else if(v.isMatrix3)x.boundary=48,x.storage=48;else if(v.isMatrix4)x.boundary=64,x.storage=64;else if(v.isTexture)console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");else console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v);return x}function m(v){let x=v.target;x.removeEventListener("dispose",m);let M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),t.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(let v in s)t.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Wm{constructor(t={}){let{canvas:e=ru(),context:n=null,depth:i=!0,stencil:s=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;let f=new Uint32Array(4),g=new Int32Array(4),_=null,m=null,p=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=In,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,M=!1;this._outputColorSpace=Jh;let R=0,w=0,A=null,L=-1,S=null,T=new ee,I=new ee,k=null,V=new dt(0),B=0,{width:K,height:W}=e,nt=1,G=null,ft=null,pt=new ee(0,0,K,W),Dt=new ee(0,0,K,W),Wt=!1,de=new ui,jt=!1,Z=!1,mt=new Bt,ct=new E,bt=new ee,Ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},zt=!1;function ae(){return A===null?nt:1}let P=n;function tt(b,N){return e.getContext(b,N)}try{let b={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:o,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:h};if("setAttribute"in e)e.setAttribute("data-engine",`three.js r${oh}`);if(e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",Et,!1),P===null){if(P=tt("webgl2",b),P===null)if(tt("webgl2"))throw Error("Error creating WebGL context with your selected attributes.");else throw Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Q,J,Y,ht,ot,st,Xt,qt,Zt,C,y,U,q,et,X,St,lt,wt,Nt,at,vt,Rt,Pt,yt;function $t(){if(Q=new Xv(P),Q.init(),Rt=new Hm(P,Q),J=new Bv(P,Q,t,Rt),Y=new yM(P,Q),J.reversedDepthBuffer&&u)Y.buffers.depth.setReversed(!0);ht=new Zv(P),ot=new oM,st=new MM(P,Q,Y,ot,J,Rt,ht),Xt=new kv(x),qt=new Wv(x),Zt=new t0(P),Pt=new Fv(P,Zt),C=new qv(P,Zt,ht,Pt),y=new $v(P,C,Zt,ht),Nt=new Jv(P,J,st),St=new zv(ot),U=new aM(x,Xt,qt,Q,J,Pt,St),q=new EM(x,ot),et=new cM,X=new mM(Q),wt=new Nv(x,Xt,qt,Y,y,d,o),lt=new xM(x,y,J),yt=new wM(P,ht,J,Y),at=new Ov(P,Q,ht),vt=new Yv(P,Q,ht),ht.programs=U.programs,x.capabilities=J,x.extensions=Q,x.properties=ot,x.renderLists=et,x.shadowMap=lt,x.state=Y,x.info=ht}$t();let D=new Vm(x,P);this.xr=D,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){let b=Q.get("WEBGL_lose_context");if(b)b.loseContext()},this.forceContextRestore=function(){let b=Q.get("WEBGL_lose_context");if(b)b.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(b){if(b===void 0)return;nt=b,this.setSize(K,W,!1)},this.getSize=function(b){return b.set(K,W)},this.setSize=function(b,N,O=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}if(K=b,W=N,e.width=Math.floor(b*nt),e.height=Math.floor(N*nt),O===!0)e.style.width=b+"px",e.style.height=N+"px";this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(K*nt,W*nt).floor()},this.setDrawingBufferSize=function(b,N,O){K=b,W=N,nt=O,e.width=Math.floor(b*O),e.height=Math.floor(N*O),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(pt)},this.setViewport=function(b,N,O,z){if(b.isVector4)pt.set(b.x,b.y,b.z,b.w);else pt.set(b,N,O,z);Y.viewport(T.copy(pt).multiplyScalar(nt).round())},this.getScissor=function(b){return b.copy(Dt)},this.setScissor=function(b,N,O,z){if(b.isVector4)Dt.set(b.x,b.y,b.z,b.w);else Dt.set(b,N,O,z);Y.scissor(I.copy(Dt).multiplyScalar(nt).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(b){Y.setScissorTest(Wt=b)},this.setOpaqueSort=function(b){G=b},this.setTransparentSort=function(b){ft=b},this.getClearColor=function(b){return b.copy(wt.getClearColor())},this.setClearColor=function(){wt.setClearColor(...arguments)},this.getClearAlpha=function(){return wt.getClearAlpha()},this.setClearAlpha=function(){wt.setClearAlpha(...arguments)},this.clear=function(b=!0,N=!0,O=!0){let z=0;if(b){let F=!1;if(A!==null){let rt=A.texture.format;F=rt===No||rt===Uo||rt===Lo}if(F){let rt=A.texture.type,xt=rt===qn||rt===ki||rt===Ds||rt===Hi||rt===Io||rt===Do,At=wt.getClearColor(),Tt=wt.getClearAlpha(),{r:Ft,g:kt,b:It}=At;if(xt)f[0]=Ft,f[1]=kt,f[2]=It,f[3]=Tt,P.clearBufferuiv(P.COLOR,0,f);else g[0]=Ft,g[1]=kt,g[2]=It,g[3]=Tt,P.clearBufferiv(P.COLOR,0,g)}else z|=P.COLOR_BUFFER_BIT}if(N)z|=P.DEPTH_BUFFER_BIT;if(O)z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),wt.dispose(),et.dispose(),X.dispose(),ot.dispose(),Xt.dispose(),qt.dispose(),y.dispose(),Pt.dispose(),yt.dispose(),U.dispose(),D.dispose(),D.removeEventListener("sessionstart",En),D.removeEventListener("sessionend",wn),fi.stop()};function _t(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let b=ht.autoReset,N=lt.enabled,O=lt.autoUpdate,z=lt.needsUpdate,F=lt.type;$t(),ht.autoReset=b,lt.enabled=N,lt.autoUpdate=O,lt.needsUpdate=z,lt.type=F}function Et(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function it(b){let N=b.target;N.removeEventListener("dispose",it),j(N)}function j(b){Ct(b),ot.remove(b)}function Ct(b){let N=ot.get(b).programs;if(N!==void 0){if(N.forEach(function(O){U.releaseProgram(O)}),b.isShaderMaterial)U.releaseShaderCache(b)}}this.renderBufferDirect=function(b,N,O,z,F,rt){if(N===null)N=Ut;let xt=F.isMesh&&F.matrixWorld.determinant()<0,At=Qm(b,N,O,z,F);Y.setMaterial(z,xt);let Tt=O.index,Ft=1;if(z.wireframe===!0){if(Tt=C.getWireframeAttribute(O),Tt===void 0)return;Ft=2}let kt=O.drawRange,It=O.attributes.position,Qt=kt.start*Ft,le=(kt.start+kt.count)*Ft;if(rt!==null)Qt=Math.max(Qt,rt.start*Ft),le=Math.min(le,(rt.start+rt.count)*Ft);if(Tt!==null)Qt=Math.max(Qt,0),le=Math.min(le,Tt.count);else if(It!==void 0&&It!==null)Qt=Math.max(Qt,0),le=Math.min(le,It.count);let ve=le-Qt;if(ve<0||ve===1/0)return;Pt.setup(F,z,At,O,Tt);let fe,ue=at;if(Tt!==null)fe=Zt.get(Tt),ue=vt,ue.setIndex(fe);if(F.isMesh)if(z.wireframe===!0)Y.setLineWidth(z.wireframeLinewidth*ae()),ue.setMode(P.LINES);else ue.setMode(P.TRIANGLES);else if(F.isLine){let Lt=z.linewidth;if(Lt===void 0)Lt=1;if(Y.setLineWidth(Lt*ae()),F.isLineSegments)ue.setMode(P.LINES);else if(F.isLineLoop)ue.setMode(P.LINE_LOOP);else ue.setMode(P.LINE_STRIP)}else if(F.isPoints)ue.setMode(P.POINTS);else if(F.isSprite)ue.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Ts("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ue.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(!Q.get("WEBGL_multi_draw")){let{_multiDrawStarts:Lt,_multiDrawCounts:me,_multiDrawCount:ie}=F,Ke=Tt?Zt.get(Tt).bytesPerElement:1,ts=ot.get(z).currentProgram.getUniforms();for(let Qe=0;Qe<ie;Qe++)ts.setValue(P,"_gl_DrawID",Qe),ue.render(Lt[Qe]/Ke,me[Qe])}else ue.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)ue.renderInstances(Qt,ve,F.count);else if(O.isInstancedBufferGeometry){let Lt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,me=Math.min(O.instanceCount,Lt);ue.renderInstances(Qt,ve,me)}else ue.render(Qt,ve)};function Gt(b,N,O){if(b.transparent===!0&&b.side===Mn&&b.forceSinglePass===!1)b.side=Ze,b.needsUpdate=!0,La(b,N,O),b.side=Ni,b.needsUpdate=!0,La(b,N,O),b.side=Mn;else La(b,N,O)}this.compile=function(b,N,O=null){if(O===null)O=b;if(m=X.get(O),m.init(N),v.push(m),O.traverseVisible(function(F){if(F.isLight&&F.layers.test(N.layers)){if(m.pushLight(F),F.castShadow)m.pushShadow(F)}}),b!==O)b.traverseVisible(function(F){if(F.isLight&&F.layers.test(N.layers)){if(m.pushLight(F),F.castShadow)m.pushShadow(F)}});m.setupLights();let z=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let rt=F.material;if(rt)if(Array.isArray(rt))for(let xt=0;xt<rt.length;xt++){let At=rt[xt];Gt(At,O,F),z.add(At)}else Gt(rt,O,F),z.add(rt)}),m=v.pop(),z},this.compileAsync=function(b,N,O=null){let z=this.compile(b,N,O);return new Promise((F)=>{function rt(){if(z.forEach(function(xt){if(ot.get(xt).currentProgram.isReady())z.delete(xt)}),z.size===0){F(b);return}setTimeout(rt,10)}if(Q.get("KHR_parallel_shader_compile")!==null)rt();else setTimeout(rt,10)})};let he=null;function oe(b){if(he)he(b)}function En(){fi.stop()}function wn(){fi.start()}let fi=new Im;if(fi.setAnimationLoop(oe),typeof self<"u")fi.setContext(self);this.setAnimationLoop=function(b){he=b,D.setAnimationLoop(b),b===null?fi.stop():fi.start()},D.addEventListener("sessionstart",En),D.addEventListener("sessionend",wn),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(b.matrixWorldAutoUpdate===!0)b.updateMatrixWorld();if(N.parent===null&&N.matrixWorldAutoUpdate===!0)N.updateMatrixWorld();if(D.enabled===!0&&D.isPresenting===!0){if(D.cameraAutoUpdate===!0)D.updateCamera(N);N=D.getCamera()}if(b.isScene===!0)b.onBeforeRender(x,b,N,A);if(m=X.get(b,v.length),m.init(N),v.push(m),mt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),de.setFromProjectionMatrix(mt,fl,N.reversedDepth),Z=this.localClippingEnabled,jt=St.init(this.clippingPlanes,Z),_=et.get(b,p.length),_.init(),p.push(_),D.enabled===!0&&D.isPresenting===!0){let rt=x.xr.getDepthSensingMesh();if(rt!==null)gc(rt,N,-1/0,x.sortObjects)}if(gc(b,N,0,x.sortObjects),_.finish(),x.sortObjects===!0)_.sort(G,ft);if(zt=D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1,zt)wt.addToRenderList(_,b);if(this.info.render.frame++,jt===!0)St.beginShadows();let O=m.state.shadowsArray;if(lt.render(O,b,N),jt===!0)St.endShadows();if(this.info.autoReset===!0)this.info.reset();let z=_.opaque,F=_.transmissive;if(m.setupLights(),N.isArrayCamera){let rt=N.cameras;if(F.length>0)for(let xt=0,At=rt.length;xt<At;xt++){let Tt=rt[xt];Pd(z,F,b,Tt)}if(zt)wt.render(b);for(let xt=0,At=rt.length;xt<At;xt++){let Tt=rt[xt];Rd(_,b,Tt,Tt.viewport)}}else{if(F.length>0)Pd(z,F,b,N);if(zt)wt.render(b);Rd(_,b,N)}if(A!==null&&w===0)st.updateMultisampleRenderTarget(A),st.updateRenderTargetMipmap(A);if(b.isScene===!0)b.onAfterRender(x,b,N);if(Pt.resetDefaultState(),L=-1,S=null,v.pop(),v.length>0){if(m=v[v.length-1],jt===!0)St.setGlobalState(x.clippingPlanes,m.state.camera)}else m=null;if(p.pop(),p.length>0)_=p[p.length-1];else _=null};function gc(b,N,O,z){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)O=b.renderOrder;else if(b.isLOD){if(b.autoUpdate===!0)b.update(N)}else if(b.isLight){if(m.pushLight(b),b.castShadow)m.pushShadow(b)}else if(b.isSprite){if(!b.frustumCulled||de.intersectsSprite(b)){if(z)bt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(mt);let xt=y.update(b),At=b.material;if(At.visible)_.push(b,xt,At,O,bt.z,null)}}else if(b.isMesh||b.isLine||b.isPoints){if(!b.frustumCulled||de.intersectsObject(b)){let xt=y.update(b),At=b.material;if(z){if(b.boundingSphere!==void 0){if(b.boundingSphere===null)b.computeBoundingSphere();bt.copy(b.boundingSphere.center)}else{if(xt.boundingSphere===null)xt.computeBoundingSphere();bt.copy(xt.boundingSphere.center)}bt.applyMatrix4(b.matrixWorld).applyMatrix4(mt)}if(Array.isArray(At)){let Tt=xt.groups;for(let Ft=0,kt=Tt.length;Ft<kt;Ft++){let It=Tt[Ft],Qt=At[It.materialIndex];if(Qt&&Qt.visible)_.push(b,xt,Qt,O,bt.z,It)}}else if(At.visible)_.push(b,xt,At,O,bt.z,null)}}}let rt=b.children;for(let xt=0,At=rt.length;xt<At;xt++)gc(rt[xt],N,O,z)}function Rd(b,N,O,z){let{opaque:F,transmissive:rt,transparent:xt}=b;if(m.setupLightsView(O),jt===!0)St.setGlobalState(x.clippingPlanes,O);if(z)Y.viewport(T.copy(z));if(F.length>0)Da(F,N,O);if(rt.length>0)Da(rt,N,O);if(xt.length>0)Da(xt,N,O);Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Pd(b,N,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;if(m.state.transmissionRenderTarget[z.id]===void 0)m.state.transmissionRenderTarget[z.id]=new De(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?hn:qn,minFilter:zi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace});let rt=m.state.transmissionRenderTarget[z.id],xt=z.viewport||T;rt.setSize(xt.z*x.transmissionResolutionScale,xt.w*x.transmissionResolutionScale);let At=x.getRenderTarget(),Tt=x.getActiveCubeFace(),Ft=x.getActiveMipmapLevel();if(x.setRenderTarget(rt),x.getClearColor(V),B=x.getClearAlpha(),B<1)x.setClearColor(16777215,0.5);if(x.clear(),zt)wt.render(O);let kt=x.toneMapping;x.toneMapping=In;let It=z.viewport;if(z.viewport!==void 0)z.viewport=void 0;if(m.setupLightsView(z),jt===!0)St.setGlobalState(x.clippingPlanes,z);if(Da(b,O,z),st.updateMultisampleRenderTarget(rt),st.updateRenderTargetMipmap(rt),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let le=0,ve=N.length;le<ve;le++){let fe=N[le],{object:ue,geometry:Lt,material:me,group:ie}=fe;if(me.side===Mn&&ue.layers.test(z.layers)){let Ke=me.side;me.side=Ze,me.needsUpdate=!0,Id(ue,O,z,Lt,me,ie),me.side=Ke,me.needsUpdate=!0,Qt=!0}}if(Qt===!0)st.updateMultisampleRenderTarget(rt),st.updateRenderTargetMipmap(rt)}if(x.setRenderTarget(At,Tt,Ft),x.setClearColor(V,B),It!==void 0)z.viewport=It;x.toneMapping=kt}function Da(b,N,O){let z=N.isScene===!0?N.overrideMaterial:null;for(let F=0,rt=b.length;F<rt;F++){let xt=b[F],{object:At,geometry:Tt,group:Ft,material:kt}=xt;if(kt.allowOverride===!0&&z!==null)kt=z;if(At.layers.test(O.layers))Id(At,N,O,Tt,kt,Ft)}}function Id(b,N,O,z,F,rt){if(b.onBeforeRender(x,N,O,z,F,rt),b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,N,O,z,b,rt),F.transparent===!0&&F.side===Mn&&F.forceSinglePass===!1)F.side=Ze,F.needsUpdate=!0,x.renderBufferDirect(O,N,z,F,b,rt),F.side=Ni,F.needsUpdate=!0,x.renderBufferDirect(O,N,z,F,b,rt),F.side=Mn;else x.renderBufferDirect(O,N,z,F,b,rt);b.onAfterRender(x,N,O,z,F,rt)}function La(b,N,O){if(N.isScene!==!0)N=Ut;let z=ot.get(b),F=m.state.lights,rt=m.state.shadowsArray,xt=F.state.version,At=U.getParameters(b,F.state,rt,N,O),Tt=U.getProgramCacheKey(At),Ft=z.programs;if(z.environment=b.isMeshStandardMaterial?N.environment:null,z.fog=N.fog,z.envMap=(b.isMeshStandardMaterial?qt:Xt).get(b.envMap||z.environment),z.envMapRotation=z.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ft===void 0)b.addEventListener("dispose",it),Ft=new Map,z.programs=Ft;let kt=Ft.get(Tt);if(kt!==void 0){if(z.currentProgram===kt&&z.lightsStateVersion===xt)return Ld(b,At),kt}else At.uniforms=U.getUniforms(b),b.onBeforeCompile(At,x),kt=U.acquireProgram(At,Tt),Ft.set(Tt,kt),z.uniforms=At.uniforms;let It=z.uniforms;if(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)It.clippingPlanes=St.uniform;if(Ld(b,At),z.needsLights=tg(b),z.lightsStateVersion=xt,z.needsLights)It.ambientLightColor.value=F.state.ambient,It.lightProbe.value=F.state.probe,It.directionalLights.value=F.state.directional,It.directionalLightShadows.value=F.state.directionalShadow,It.spotLights.value=F.state.spot,It.spotLightShadows.value=F.state.spotShadow,It.rectAreaLights.value=F.state.rectArea,It.ltc_1.value=F.state.rectAreaLTC1,It.ltc_2.value=F.state.rectAreaLTC2,It.pointLights.value=F.state.point,It.pointLightShadows.value=F.state.pointShadow,It.hemisphereLights.value=F.state.hemi,It.directionalShadowMap.value=F.state.directionalShadowMap,It.directionalShadowMatrix.value=F.state.directionalShadowMatrix,It.spotShadowMap.value=F.state.spotShadowMap,It.spotLightMatrix.value=F.state.spotLightMatrix,It.spotLightMap.value=F.state.spotLightMap,It.pointShadowMap.value=F.state.pointShadowMap,It.pointShadowMatrix.value=F.state.pointShadowMatrix;return z.currentProgram=kt,z.uniformsList=null,kt}function Dd(b){if(b.uniformsList===null){let N=b.currentProgram.getUniforms();b.uniformsList=Pa.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function Ld(b,N){let O=ot.get(b);O.outputColorSpace=N.outputColorSpace,O.batching=N.batching,O.batchingColor=N.batchingColor,O.instancing=N.instancing,O.instancingColor=N.instancingColor,O.instancingMorph=N.instancingMorph,O.skinning=N.skinning,O.morphTargets=N.morphTargets,O.morphNormals=N.morphNormals,O.morphColors=N.morphColors,O.morphTargetsCount=N.morphTargetsCount,O.numClippingPlanes=N.numClippingPlanes,O.numIntersection=N.numClipIntersection,O.vertexAlphas=N.vertexAlphas,O.vertexTangents=N.vertexTangents,O.toneMapping=N.toneMapping}function Qm(b,N,O,z,F){if(N.isScene!==!0)N=Ut;st.resetTextureUnits();let rt=N.fog,xt=z.isMeshStandardMaterial?N.environment:null,At=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Us,Tt=(z.isMeshStandardMaterial?qt:Xt).get(z.envMap||xt),Ft=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,kt=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),It=!!O.morphAttributes.position,Qt=!!O.morphAttributes.normal,le=!!O.morphAttributes.color,ve=In;if(z.toneMapped){if(A===null||A.isXRRenderTarget===!0)ve=x.toneMapping}let fe=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ue=fe!==void 0?fe.length:0,Lt=ot.get(z),me=m.state.lights;if(jt===!0){if(Z===!0||b!==S){let He=b===S&&z.id===L;St.setState(z,b,He)}}let ie=!1;if(z.version===Lt.__version){if(Lt.needsLights&&Lt.lightsStateVersion!==me.state.version)ie=!0;else if(Lt.outputColorSpace!==At)ie=!0;else if(F.isBatchedMesh&&Lt.batching===!1)ie=!0;else if(!F.isBatchedMesh&&Lt.batching===!0)ie=!0;else if(F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null)ie=!0;else if(F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null)ie=!0;else if(F.isInstancedMesh&&Lt.instancing===!1)ie=!0;else if(!F.isInstancedMesh&&Lt.instancing===!0)ie=!0;else if(F.isSkinnedMesh&&Lt.skinning===!1)ie=!0;else if(!F.isSkinnedMesh&&Lt.skinning===!0)ie=!0;else if(F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null)ie=!0;else if(F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null)ie=!0;else if(F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null)ie=!0;else if(F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null)ie=!0;else if(Lt.envMap!==Tt)ie=!0;else if(z.fog===!0&&Lt.fog!==rt)ie=!0;else if(Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==St.numPlanes||Lt.numIntersection!==St.numIntersection))ie=!0;else if(Lt.vertexAlphas!==Ft)ie=!0;else if(Lt.vertexTangents!==kt)ie=!0;else if(Lt.morphTargets!==It)ie=!0;else if(Lt.morphNormals!==Qt)ie=!0;else if(Lt.morphColors!==le)ie=!0;else if(Lt.toneMapping!==ve)ie=!0;else if(Lt.morphTargetsCount!==ue)ie=!0}else ie=!0,Lt.__version=z.version;let Ke=Lt.currentProgram;if(ie===!0)Ke=La(z,N,F);let ts=!1,Qe=!1,nr=!1,ge=Ke.getUniforms(),sn=Lt.uniforms;if(Y.useProgram(Ke.program))ts=!0,Qe=!0,nr=!0;if(z.id!==L)L=z.id,Qe=!0;if(ts||S!==b){if(Y.buffers.depth.getReversed()&&b.reversedDepth!==!0)b._reversedDepth=!0,b.updateProjectionMatrix();ge.setValue(P,"projectionMatrix",b.projectionMatrix),ge.setValue(P,"viewMatrix",b.matrixWorldInverse);let Xe=ge.map.cameraPosition;if(Xe!==void 0)Xe.setValue(P,ct.setFromMatrixPosition(b.matrixWorld));if(J.logarithmicDepthBuffer)ge.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2));if(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)ge.setValue(P,"isOrthographic",b.isOrthographicCamera===!0);if(S!==b)S=b,Qe=!0,nr=!0}if(F.isSkinnedMesh){ge.setOptional(P,F,"bindMatrix"),ge.setOptional(P,F,"bindMatrixInverse");let He=F.skeleton;if(He){if(He.boneTexture===null)He.computeBoneTexture();ge.setValue(P,"boneTexture",He.boneTexture,st)}}if(F.isBatchedMesh){if(ge.setOptional(P,F,"batchingTexture"),ge.setValue(P,"batchingTexture",F._matricesTexture,st),ge.setOptional(P,F,"batchingIdTexture"),ge.setValue(P,"batchingIdTexture",F._indirectTexture,st),ge.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null)ge.setValue(P,"batchingColorTexture",F._colorsTexture,st)}let rn=O.morphAttributes;if(rn.position!==void 0||rn.normal!==void 0||rn.color!==void 0)Nt.update(F,O,Ke);if(Qe||Lt.receiveShadow!==F.receiveShadow)Lt.receiveShadow=F.receiveShadow,ge.setValue(P,"receiveShadow",F.receiveShadow);if(z.isMeshGouraudMaterial&&z.envMap!==null)sn.envMap.value=Tt,sn.flipEnvMap.value=Tt.isCubeTexture&&Tt.isRenderTargetTexture===!1?-1:1;if(z.isMeshStandardMaterial&&z.envMap===null&&N.environment!==null)sn.envMapIntensity.value=N.environmentIntensity;if(Qe){if(ge.setValue(P,"toneMappingExposure",x.toneMappingExposure),Lt.needsLights)jm(sn,nr);if(rt&&z.fog===!0)q.refreshFogUniforms(sn,rt);q.refreshMaterialUniforms(sn,z,nt,W,m.state.transmissionRenderTarget[b.id]),Pa.upload(P,Dd(Lt),sn,st)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0)Pa.upload(P,Dd(Lt),sn,st),z.uniformsNeedUpdate=!1;if(z.isSpriteMaterial)ge.setValue(P,"center",F.center);if(ge.setValue(P,"modelViewMatrix",F.modelViewMatrix),ge.setValue(P,"normalMatrix",F.normalMatrix),ge.setValue(P,"modelMatrix",F.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){let He=z.uniformsGroups;for(let Xe=0,_c=He.length;Xe<_c;Xe++){let pi=He[Xe];yt.update(pi,Ke),yt.bind(pi,Ke)}}return Ke}function jm(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function tg(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,N,O){let z=ot.get(b);if(z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1)z.__useRenderToTexture=!1;ot.get(b.texture).__webglTexture=N,ot.get(b.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:O,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,N){let O=ot.get(b);O.__webglFramebuffer=N,O.__useDefaultFramebuffer=N===void 0};let eg=P.createFramebuffer();this.setRenderTarget=function(b,N=0,O=0){A=b,R=N,w=O;let z=!0,F=null,rt=!1,xt=!1;if(b){let Tt=ot.get(b);if(Tt.__useDefaultFramebuffer!==void 0)Y.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(Tt.__webglFramebuffer===void 0)st.setupRenderTarget(b);else if(Tt.__hasExternalTextures)st.rebindTextures(b,ot.get(b.texture).__webglTexture,ot.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let It=b.depthTexture;if(Tt.__boundDepthTexture!==It){if(It!==null&&ot.has(It)&&(b.width!==It.image.width||b.height!==It.image.height))throw Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");st.setupDepthRenderbuffer(b)}}let Ft=b.texture;if(Ft.isData3DTexture||Ft.isDataArrayTexture||Ft.isCompressedArrayTexture)xt=!0;let kt=ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget){if(Array.isArray(kt[N]))F=kt[N][O];else F=kt[N];rt=!0}else if(b.samples>0&&st.useMultisampledRTT(b)===!1)F=ot.get(b).__webglMultisampledFramebuffer;else if(Array.isArray(kt))F=kt[O];else F=kt;T.copy(b.viewport),I.copy(b.scissor),k=b.scissorTest}else T.copy(pt).multiplyScalar(nt).floor(),I.copy(Dt).multiplyScalar(nt).floor(),k=Wt;if(O!==0)F=eg;if(Y.bindFramebuffer(P.FRAMEBUFFER,F)&&z)Y.drawBuffers(b,F);if(Y.viewport(T),Y.scissor(I),Y.setScissorTest(k),rt){let Tt=ot.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Tt.__webglTexture,O)}else if(xt){let Tt=N;for(let Ft=0;Ft<b.textures.length;Ft++){let kt=ot.get(b.textures[Ft]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ft,kt.__webglTexture,O,Tt)}}else if(b!==null&&O!==0){let Tt=ot.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Tt.__webglTexture,O)}L=-1},this.readRenderTargetPixels=function(b,N,O,z,F,rt,xt,At=0){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Tt=ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0)Tt=Tt[xt];if(Tt){Y.bindFramebuffer(P.FRAMEBUFFER,Tt);try{let Ft=b.textures[At],{format:kt,type:It}=Ft;if(!J.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!J.textureTypeReadable(It)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(N>=0&&N<=b.width-z&&(O>=0&&O<=b.height-F)){if(b.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+At);P.readPixels(N,O,z,F,Rt.convert(kt),Rt.convert(It),rt)}}finally{let Ft=A!==null?ot.get(A).__webglFramebuffer:null;Y.bindFramebuffer(P.FRAMEBUFFER,Ft)}}},this.readRenderTargetPixelsAsync=async function(b,N,O,z,F,rt,xt,At=0){if(!(b&&b.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Tt=ot.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&xt!==void 0)Tt=Tt[xt];if(Tt)if(N>=0&&N<=b.width-z&&(O>=0&&O<=b.height-F)){Y.bindFramebuffer(P.FRAMEBUFFER,Tt);let Ft=b.textures[At],{format:kt,type:It}=Ft;if(!J.textureFormatReadable(kt))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!J.textureTypeReadable(It))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qt=P.createBuffer();if(P.bindBuffer(P.PIXEL_PACK_BUFFER,Qt),P.bufferData(P.PIXEL_PACK_BUFFER,rt.byteLength,P.STREAM_READ),b.textures.length>1)P.readBuffer(P.COLOR_ATTACHMENT0+At);P.readPixels(N,O,z,F,Rt.convert(kt),Rt.convert(It),0);let le=A!==null?ot.get(A).__webglFramebuffer:null;Y.bindFramebuffer(P.FRAMEBUFFER,le);let ve=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Xp(P,ve,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Qt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,rt),P.deleteBuffer(Qt),P.deleteSync(ve),rt}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,N=null,O=0){let z=Math.pow(2,-O),F=Math.floor(b.image.width*z),rt=Math.floor(b.image.height*z),xt=N!==null?N.x:0,At=N!==null?N.y:0;st.setTexture2D(b,0),P.copyTexSubImage2D(P.TEXTURE_2D,O,0,0,xt,At,F,rt),Y.unbindTexture()};let ng=P.createFramebuffer(),ig=P.createFramebuffer();if(this.copyTextureToTexture=function(b,N,O=null,z=null,F=0,rt=null){if(rt===null)if(F!==0)Ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),rt=F,F=0;else rt=0;let xt,At,Tt,Ft,kt,It,Qt,le,ve,fe=b.isCompressedTexture?b.mipmaps[rt]:b.image;if(O!==null)xt=O.max.x-O.min.x,At=O.max.y-O.min.y,Tt=O.isBox3?O.max.z-O.min.z:1,Ft=O.min.x,kt=O.min.y,It=O.isBox3?O.min.z:0;else{let rn=Math.pow(2,-F);if(xt=Math.floor(fe.width*rn),At=Math.floor(fe.height*rn),b.isDataArrayTexture)Tt=fe.depth;else if(b.isData3DTexture)Tt=Math.floor(fe.depth*rn);else Tt=1;Ft=0,kt=0,It=0}if(z!==null)Qt=z.x,le=z.y,ve=z.z;else Qt=0,le=0,ve=0;let ue=Rt.convert(N.format),Lt=Rt.convert(N.type),me;if(N.isData3DTexture)st.setTexture3D(N,0),me=P.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)st.setTexture2DArray(N,0),me=P.TEXTURE_2D_ARRAY;else st.setTexture2D(N,0),me=P.TEXTURE_2D;P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);let ie=P.getParameter(P.UNPACK_ROW_LENGTH),Ke=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ts=P.getParameter(P.UNPACK_SKIP_PIXELS),Qe=P.getParameter(P.UNPACK_SKIP_ROWS),nr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,fe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ft),P.pixelStorei(P.UNPACK_SKIP_ROWS,kt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,It);let ge=b.isDataArrayTexture||b.isData3DTexture,sn=N.isDataArrayTexture||N.isData3DTexture;if(b.isDepthTexture){let rn=ot.get(b),He=ot.get(N),Xe=ot.get(rn.__renderTarget),_c=ot.get(He.__renderTarget);Y.bindFramebuffer(P.READ_FRAMEBUFFER,Xe.__webglFramebuffer),Y.bindFramebuffer(P.DRAW_FRAMEBUFFER,_c.__webglFramebuffer);for(let pi=0;pi<Tt;pi++){if(ge)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ot.get(b).__webglTexture,F,It+pi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,ot.get(N).__webglTexture,rt,ve+pi);P.blitFramebuffer(Ft,kt,xt,At,Qt,le,xt,At,P.DEPTH_BUFFER_BIT,P.NEAREST)}Y.bindFramebuffer(P.READ_FRAMEBUFFER,null),Y.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(F!==0||b.isRenderTargetTexture||ot.has(b)){let rn=ot.get(b),He=ot.get(N);Y.bindFramebuffer(P.READ_FRAMEBUFFER,ng),Y.bindFramebuffer(P.DRAW_FRAMEBUFFER,ig);for(let Xe=0;Xe<Tt;Xe++){if(ge)P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,rn.__webglTexture,F,It+Xe);else P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,rn.__webglTexture,F);if(sn)P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,He.__webglTexture,rt,ve+Xe);else P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,He.__webglTexture,rt);if(F!==0)P.blitFramebuffer(Ft,kt,xt,At,Qt,le,xt,At,P.COLOR_BUFFER_BIT,P.NEAREST);else if(sn)P.copyTexSubImage3D(me,rt,Qt,le,ve+Xe,Ft,kt,xt,At);else P.copyTexSubImage2D(me,rt,Qt,le,Ft,kt,xt,At)}Y.bindFramebuffer(P.READ_FRAMEBUFFER,null),Y.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(sn)if(b.isDataTexture||b.isData3DTexture)P.texSubImage3D(me,rt,Qt,le,ve,xt,At,Tt,ue,Lt,fe.data);else if(N.isCompressedArrayTexture)P.compressedTexSubImage3D(me,rt,Qt,le,ve,xt,At,Tt,ue,fe.data);else P.texSubImage3D(me,rt,Qt,le,ve,xt,At,Tt,ue,Lt,fe);else if(b.isDataTexture)P.texSubImage2D(P.TEXTURE_2D,rt,Qt,le,xt,At,ue,Lt,fe.data);else if(b.isCompressedTexture)P.compressedTexSubImage2D(P.TEXTURE_2D,rt,Qt,le,fe.width,fe.height,ue,fe.data);else P.texSubImage2D(P.TEXTURE_2D,rt,Qt,le,xt,At,ue,Lt,fe);if(P.pixelStorei(P.UNPACK_ROW_LENGTH,ie),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Ke),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ts),P.pixelStorei(P.UNPACK_SKIP_ROWS,Qe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,nr),rt===0&&N.generateMipmaps)P.generateMipmap(me);Y.unbindTexture()},this.initRenderTarget=function(b){if(ot.get(b).__webglFramebuffer===void 0)st.setupRenderTarget(b)},this.initTexture=function(b){if(b.isCubeTexture)st.setTextureCube(b,0);else if(b.isData3DTexture)st.setTexture3D(b,0);else if(b.isDataArrayTexture||b.isCompressedArrayTexture)st.setTexture2DArray(b,0);else st.setTexture2D(b,0);Y.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,Y.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fl}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}var Xm={type:"change"},Md={type:"start"},Ym={type:"end"},pc=new Dn,qm=new on,AM=Math.cos(70*pl.DEG2RAD),Re=new E,$e=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yd=0.000001;class Sd extends Yi{constructor(t,e=null){super(t,e);if(this.state=ce.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=0.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Wn.ROTATE,MIDDLE:Wn.DOLLY,RIGHT:Wn.PAN},this.touches={ONE:Xn.ROTATE,TWO:Xn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new Ee,this._lastTargetPosition=new E,this._quat=new Ee().setFromUnitVectors(t.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Js,this._sphericalDelta=new Js,this._scale=1,this._panOffset=new E,this._rotateStart=new H,this._rotateEnd=new H,this._rotateDelta=new H,this._panStart=new H,this._panEnd=new H,this._panDelta=new H,this._dollyStart=new H,this._dollyEnd=new H,this._dollyDelta=new H,this._dollyDirection=new E,this._mouse=new H,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=RM.bind(this),this._onPointerDown=CM.bind(this),this._onPointerUp=PM.bind(this),this._onContextMenu=OM.bind(this),this._onMouseWheel=LM.bind(this),this._onKeyDown=UM.bind(this),this._onTouchStart=NM.bind(this),this._onTouchMove=FM.bind(this),this._onMouseDown=IM.bind(this),this._onMouseMove=DM.bind(this),this._interceptControlDown=BM.bind(this),this._interceptControlUp=zM.bind(this),this.domElement!==null)this.connect(this.domElement);this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null)this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xm),this.update(),this.state=ce.NONE}update(t=null){let e=this.object.position;if(Re.copy(e).sub(this.target),Re.applyQuaternion(this._quat),this._spherical.setFromVector3(Re),this.autoRotate&&this.state===ce.NONE)this._rotateLeft(this._getAutoRotationAngle(t));if(this.enableDamping)this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor;else this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi;let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;if(isFinite(n)&&isFinite(i)){if(n<-Math.PI)n+=$e;else if(n>Math.PI)n-=$e;if(i<-Math.PI)i+=$e;else if(i>Math.PI)i-=$e;if(n<=i)this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta));else this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)}if(this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0)this.target.addScaledVector(this._panOffset,this.dampingFactor);else this.target.add(this._panOffset);this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Re.setFromSpherical(this._spherical),Re.applyQuaternion(this._quatInverse),e.copy(this.target).add(Re),this.object.lookAt(this.target),this.enableDamping===!0)this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor);else this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0);if(this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){let a=Re.length();r=this._clampDistance(a*this._scale);let o=a-r;this.object.position.addScaledVector(this._dollyDirection,o),this.object.updateMatrixWorld(),s=!!o}else if(this.object.isOrthographicCamera){let a=new E(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=o!==this.object.zoom;let l=new E(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),r=Re.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;if(r!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position);else if(pc.origin.copy(this.object.position),pc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(pc.direction))<AM)this.object.lookAt(this.target);else qm.setFromNormalAndCoplanarPoint(this.object.up,this.target),pc.intersectPlane(qm,this.target)}else if(this.object.isOrthographicCamera){let r=this.object.zoom;if(this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom)this.object.updateProjectionMatrix(),s=!0}if(this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>yd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yd||this._lastTargetPosition.distanceToSquared(this.target)>yd)return this.dispatchEvent(Xm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0;return!1}_getAutoRotationAngle(t){if(t!==null)return $e/60*this.autoRotateSpeed*t;else return $e/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*0.01);return Math.pow(0.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Re.setFromMatrixColumn(e,0),Re.multiplyScalar(-t),this._panOffset.add(Re)}_panUp(t,e){if(this.screenSpacePanning===!0)Re.setFromMatrixColumn(e,1);else Re.setFromMatrixColumn(e,0),Re.crossVectors(this.object.up,Re);Re.multiplyScalar(t),this._panOffset.add(Re)}_pan(t,e){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Re.copy(i).sub(this.target);let s=Re.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/n.clientHeight,this.object.matrix),this._panUp(2*e*s/n.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera)this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix);else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1}_dollyOut(t){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=t;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_dollyIn(t){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=t;else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=t-n.left,s=e-n.top,{width:r,height:a}=n;this._mouse.x=i/r*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){if(this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0)this._dollyOut(this._getZoomScale(this._dollyDelta.y));else if(this._dollyDelta.y<0)this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){if(this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0)this._dollyIn(this._getZoomScale(t.deltaY));else if(t.deltaY>0)this._dollyOut(this._getZoomScale(t.deltaY));this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate)this._rotateUp($e*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,this.keyPanSpeed);e=!0;break;case this.keys.BOTTOM:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate)this._rotateUp(-$e*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(0,-this.keyPanSpeed);e=!0;break;case this.keys.LEFT:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate)this._rotateLeft($e*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(this.keyPanSpeed,0);e=!0;break;case this.keys.RIGHT:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate)this._rotateLeft(-$e*this.keyRotateSpeed/this.domElement.clientHeight)}else if(this.enablePan)this._pan(-this.keyPanSpeed,0);e=!0;break}if(e)t.preventDefault(),this.update()}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=0.5*(t.pageX+e.x),i=0.5*(t.pageY+e.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=0.5*(t.pageX+e.x),i=0.5*(t.pageY+e.y);this._panStart.set(n,i)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,s=Math.sqrt(n*n+i*i);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){if(this.enableZoom)this._handleTouchStartDolly(t);if(this.enablePan)this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){if(this.enableZoom)this._handleTouchStartDolly(t);if(this.enableRotate)this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let n=this._getSecondPointerPosition(t),i=0.5*(t.pageX+n.x),s=0.5*(t.pageY+n.y);this._rotateEnd.set(i,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft($e*this._rotateDelta.x/e.clientHeight),this._rotateUp($e*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),n=0.5*(t.pageX+e.x),i=0.5*(t.pageY+e.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),n=t.pageX-e.x,i=t.pageY-e.y,s=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let r=(t.pageX+e.x)*0.5,a=(t.pageY+e.y)*0.5;this._updateZoomParameters(r,a)}_handleTouchMoveDollyPan(t){if(this.enableZoom)this._handleTouchMoveDolly(t);if(this.enablePan)this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){if(this.enableZoom)this._handleTouchMoveDolly(t);if(this.enableRotate)this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];if(e===void 0)e=new H,this._pointerPositions[t.pointerId]=e;e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}if(t.ctrlKey&&!this._controlActive)n.deltaY*=10;return n}}function CM(t){if(this.enabled===!1)return;if(this._pointers.length===0)this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp);if(this._isTrackingPointer(t))return;if(this._addPointer(t),t.pointerType==="touch")this._onTouchStart(t);else this._onMouseDown(t)}function RM(t){if(this.enabled===!1)return;if(t.pointerType==="touch")this._onTouchMove(t);else this._onMouseMove(t)}function PM(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ym),this.state=ce.NONE;break;case 1:let e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function IM(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Wn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=ce.DOLLY;break;case Wn.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ce.ROTATE}break;case Wn.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=ce.PAN}break;default:this.state=ce.NONE}if(this.state!==ce.NONE)this.dispatchEvent(Md)}function DM(t){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function LM(t){if(this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE)return;t.preventDefault(),this.dispatchEvent(Md),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(Ym)}function UM(t){if(this.enabled===!1)return;this._handleKeyDown(t)}function NM(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Xn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=ce.TOUCH_ROTATE;break;case Xn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case Xn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=ce.TOUCH_DOLLY_PAN;break;case Xn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}if(this.state!==ce.NONE)this.dispatchEvent(Md)}function FM(t){switch(this._trackPointer(t),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=ce.NONE}}function OM(t){if(this.enabled===!1)return;t.preventDefault()}function BM(t){if(t.key==="Control")this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}function zM(t){if(t.key==="Control")this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0})}var js=new Be(0,0,0,"YXZ"),tr=new E,kM={type:"change"},HM={type:"lock"},GM={type:"unlock"},Zm=0.002,Jm=Math.PI/2;class bd extends Yi{constructor(t,e=null){super(t,e);if(this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=VM.bind(this),this._onPointerlockChange=WM.bind(this),this._onPointerlockError=XM.bind(this),this.domElement!==null)this.connect(this.domElement)}connect(t){super.connect(t),this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.object.quaternion)}moveForward(t){if(this.enabled===!1)return;let e=this.object;tr.setFromMatrixColumn(e.matrix,0),tr.crossVectors(e.up,tr),e.position.addScaledVector(tr,t)}moveRight(t){if(this.enabled===!1)return;let e=this.object;tr.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(tr,t)}lock(t=!1){this.domElement.requestPointerLock({unadjustedMovement:t})}unlock(){this.domElement.ownerDocument.exitPointerLock()}}function VM(t){if(this.enabled===!1||this.isLocked===!1)return;let e=this.object;js.setFromQuaternion(e.quaternion),js.y-=t.movementX*Zm*this.pointerSpeed,js.x-=t.movementY*Zm*this.pointerSpeed,js.x=Math.max(Jm-this.maxPolarAngle,Math.min(Jm-this.minPolarAngle,js.x)),e.quaternion.setFromEuler(js),this.dispatchEvent(kM)}function WM(){if(this.domElement.ownerDocument.pointerLockElement===this.domElement)this.dispatchEvent(HM),this.isLocked=!0;else this.dispatchEvent(GM),this.isLocked=!1}function XM(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}var er={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class pn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}var qM=new di(-1,1,1,-1,0,1);class $m extends Ht{constructor(){super();this.setAttribute("position",new Mt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Mt([0,2,0,0,2,0],2))}}var YM=new $m;class Qi{constructor(t){this._mesh=new pe(YM,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,qM)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Td extends pn{constructor(t,e="tDiffuse"){super();if(this.textureID=e,this.uniforms=null,this.material=null,t instanceof Se)this.uniforms=t.uniforms,this.material=t;else if(t)this.uniforms=Ln.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader});this._fsQuad=new Qi(this.material)}render(t,e,n){if(this.uniforms[this.textureID])this.uniforms[this.textureID].value=n.texture;if(this._fsQuad.material=this.material,this.renderToScreen)t.setRenderTarget(null),this._fsQuad.render(t);else{if(t.setRenderTarget(e),this.clear)t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil);this._fsQuad.render(t)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class mc extends pn{constructor(t,e){super();this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let i=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let r,a;if(this.inverse)r=0,a=1;else r=1,a=0;if(s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear)t.clear();if(t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear)t.clear();t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Ed extends pn{constructor(){super();this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class wd{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new H);this._width=n.width,this._height=n.height,e=new De(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:hn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Td(er),this.copyPass.material.blending=Sn,this.clock=new Zs}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);if(e!==-1)this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){if(t===void 0)t=this.clock.getDelta();let e=this.renderer.getRenderTarget(),n=!1;for(let i=0,s=this.passes.length;i<s;i++){let r=this.passes[i];if(r.enabled===!1)continue;if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),r.needsSwap){if(n){let a=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),o.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}if(mc!==void 0){if(r instanceof mc)n=!0;else if(r instanceof Ed)n=!1}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ad extends pn{constructor(t,e,n=null,i=null,s=null){super();this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new dt}render(t,e,n){let i=t.autoClear;t.autoClear=!1;let s,r;if(this.overrideMaterial!==null)r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial;if(this.clearColor!==null)t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha());if(this.clearAlpha!==null)s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha);if(this.clearDepth==!0)t.clearDepth();if(t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0)t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil);if(t.render(this.scene,this.camera),this.clearColor!==null)t.setClearColor(this._oldClearColor);if(this.clearAlpha!==null)t.setClearAlpha(s);if(this.overrideMaterial!==null)this.scene.overrideMaterial=r;t.autoClear=i}}var Km={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new dt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ji extends pn{constructor(t,e=1,n,i){super();this.strength=e,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new H(t.x,t.y):new H(256,256),this.clearColor=new dt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new De(s,r,{type:hn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let c=0;c<this.nMips;c++){let h=new De(s,r,{type:hn});h.texture.name="UnrealBloomPass.h"+c,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);let u=new De(s,r,{type:hn});u.texture.name="UnrealBloomPass.v"+c,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),s=Math.round(s/2),r=Math.round(r/2)}let a=Km;this.highPassUniforms=Ln.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=0.01,this.materialHighPassFilter=new Se({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];let o=[3,5,7,9,11];s=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let c=0;c<this.nMips;c++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(o[c])),this.separableBlurMaterials[c].uniforms.invSize.value=new H(1/s,1/r),s=Math.round(s/2),r=Math.round(r/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=0.1;let l=[1,0.8,0.6,0.4,0.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Ln.clone(er.uniforms),this.blendMaterial=new Se({uniforms:this.copyUniforms,vertexShader:er.vertexShader,fragmentShader:er.fragmentShader,blending:Cs,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new dt,this._oldClearAlpha=1,this._basic=new dn,this._fsQuad=new Qi(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new H(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let r=t.autoClear;if(t.autoClear=!1,t.setClearColor(this.clearColor,0),s)t.state.buffers.stencil.setTest(!1);if(this.renderToScreen)this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t);this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this._fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[o].uniforms.direction.value=ji.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[o]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=ji.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[o]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[o];if(this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s)t.state.buffers.stencil.setTest(!0);if(this.renderToScreen)t.setRenderTarget(null),this._fsQuad.render(t);else t.setRenderTarget(n),this._fsQuad.render(t);t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=r}_getSeparableBlurMaterial(t){let e=[];for(let n=0;n<t;n++)e.push(0.39894*Math.exp(-0.5*n*n/(t*t))/t);return new Se({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new H(0.5,0.5)},direction:{value:new H(0.5,0.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Se({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}ji.BlurDirectionX=new H(1,0);ji.BlurDirectionY=new H(0,1);var Ia={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Cd extends pn{constructor(){super();this.uniforms=Ln.clone(Ia.uniforms),this.material=new Ys({name:Ia.name,uniforms:this.uniforms,vertexShader:Ia.vertexShader,fragmentShader:Ia.fragmentShader}),this._fsQuad=new Qi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){if(this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping){if(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},Kt.getTransfer(this._outputColorSpace)===re)this.material.defines.SRGB_TRANSFER="";if(this._toneMapping===Ir)this.material.defines.LINEAR_TONE_MAPPING="";else if(this._toneMapping===Dr)this.material.defines.REINHARD_TONE_MAPPING="";else if(this._toneMapping===Lr)this.material.defines.CINEON_TONE_MAPPING="";else if(this._toneMapping===Ur)this.material.defines.ACES_FILMIC_TONE_MAPPING="";else if(this._toneMapping===Fr)this.material.defines.AGX_TONE_MAPPING="";else if(this._toneMapping===Or)this.material.defines.NEUTRAL_TONE_MAPPING="";else if(this._toneMapping===Nr)this.material.defines.CUSTOM_TONE_MAPPING="";this.material.needsUpdate=!0}if(this.renderToScreen===!0)t.setRenderTarget(null),this._fsQuad.render(t);else{if(t.setRenderTarget(e),this.clear)t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil);this._fsQuad.render(t)}}dispose(){this.material.dispose(),this._fsQuad.dispose()}}globalThis.THREE={...vd,OrbitControls:Sd,PointerLockControls:bd,EffectComposer:wd,RenderPass:Ad,UnrealBloomPass:ji,OutputPass:Cd};})();
