import { useGSAP } from '@gsap/react'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ModelView from './ModelView';
import { yellowImg } from '../utils';
import * as THREE from 'three';
import { View } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { models, sizes } from "../constants";


function Model() {

    const [size, setSize]= useState('small');

    const [model, setModel] = useState({
        title: 'iPhone 15 pro in Natural Titanium',
        color: ['#8f8A81', '#FFE7B9', '#6F6C64'],
        image: yellowImg
    });

    
    const cameraControllerSmall= useRef();
    const cameraControllerLarge = useRef();


    const small= useRef(new THREE.Group());
    const large= useRef(new THREE.Group());

    const [smallRotation, setSmallRotation] = useState(0);
    const [LargeRotation, setLargeRotation] = useState(0);

    useGSAP(()=>{

        gsap.to('#heading', { y: 0, opacity: 1})

    }, []);


    const tl = gsap.timeline();

    useEffect(()=>{

        if(size === 'large'){
            tl.to('#view1', { x: '-100%', duration: 2, ease: 'power2.inOut' }, '<');
            tl.to('#view2', { x: '-100%', duration: 2, ease: 'power2.inOut' }, '<');
        }

        if (size ==='small'){
            tl.to('#view1', { x: '0%', duration: 2, ease: 'power2.inOut' }, '<');
            tl.to('#view2', { x: '0%', duration: 2, ease: 'power2.inOut' }, '<');
        }


    }, [size]);
    
    

  return (
    <section className='common-padding'>    

        <div className='screen-max-width'>

            <h1 id='heading' className='section-heading'>
                Take closer look. 
            </h1>

            <div className='flex flex-col items-center mt-5'>

                <div className='w-full h-[75vh] md: h-[90vh] overflow-hidden relative'>

                    <ModelView
                        index= {1}
                        groupRef= {small}
                        gsapType= 'view1'
                        controlRef = {cameraControllerSmall}
                        setRotationState= {setSmallRotation}
                        item = {model}
                        size= {size}
                    />

                    <ModelView
                        index= {2}
                        groupRef= {large}
                        gsapType= 'view2'
                        controlRef = {cameraControllerLarge}
                        setRotationState= {setLargeRotation}
                        item = {model}
                        size= {size}
                    />

                    <Canvas
                    
                        className= 'w-full h-full'
                        style= {{
                            position: 'fixed',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right:0,
                            overflow : 'hidden'
                        }}

                        eventSource={document.getElementById('root')}
                    >

                        <View.Port />

                    </Canvas>


                </div>

                <div className='mx-auto w-full'>

                    <p className='text-sm font-light text-center mb-5'>{model.title}</p>

                    <div className='flex-center'>

                        <ul className='color-container'>
                            {models.map((item, i)=>(
                                
                                <li 
                                    key={i}
                                    className='w-6 h-6 rounded-full mx-2 cursor-pointer'

                                    style={{
                                        backgroundColor: item.color[0]
                                    }}

                                    onClick={()=>setModel(item)}
                                
                                />

                            ))}
                        </ul>

                        <button className='size-btn-container'>
                            
                            {sizes.map(({label, value})=>(
                            
                                <span 
                                    key={label}
                                    className='size-btn'
                                    style={{
                                        backgroundColor: size=== value? 'white' : 'transparent',
                                        color: size=== value? 'black' : 'white',
                                    }}

                                    onClick={()=>setSize(value)}
                                >{label} </span>
                            
                            ))}
                        
                        </button>

                    </div>

                </div>

            </div>

        </div>
      
    </section>
  )
}

export default Model
