import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "../App.css";


const Particle = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <>
    <div className="w-full h-full">
    <Particles
      id="firefly-particles"
      className="w-full h-screen"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          fullScreen: false,
        },
        background: {
          color: { value: '#000' },
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 100,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffcc00',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: { enable: true, minimumValue: 1 },
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 1,
            outModes: {
              default: 'out',
            },
          },
          life: {
            duration: {
              sync: false,
              value: 3,
            },
            count: 0,
            delay: {
              random: {
                enable: true,
                minimumValue: 0.5,
              },
              value: 1,
            },
          },
        },
      }}
    />
    </div>
    </>
  );
};

export default Particle;
