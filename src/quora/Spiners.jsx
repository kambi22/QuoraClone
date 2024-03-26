import React from "react"
import { BarLoader, BeatLoader, BounceLoader, CircleLoader, ClimbingBoxLoader, ClipLoader, ClockLoader, DotLoader, FadeLoader, GridLoader, HashLoader, MoonLoader, PacmanLoader, PropagateLoader, PuffLoader, PulseLoader, RingLoader, RiseLoader, RotateLoader, ScaleLoader, SyncLoader } from "react-spinners"

const Spiners = (props) => {
  return (
    <div>
      <h5>Spiners Component</h5>
      <BarLoader loading  height={10} onDurationChange={10} width={150}></BarLoader>
      <BeatLoader  loading />
      <BounceLoader loading />
      <CircleLoader loading />
      <ClipLoader loading />
      <ClockLoader loading/>
      <DotLoader loading/>
      <FadeLoader loading/>
      <GridLoader loading/>
      <HashLoader loading/>
      <ClimbingBoxLoader loading/>
      <MoonLoader loading/>
      <PacmanLoader loading/>
      <PropagateLoader loading/>
     
  
    </div>
  )
};

export default Spiners;

