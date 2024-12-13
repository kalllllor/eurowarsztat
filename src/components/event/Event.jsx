import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Event = (props) => {
  return (
    <div className="wrapper" {...props}>
      <div className="container">
        <div className="desc__wrapper event__wrapper">
          <h3>TYTUL</h3>
          <div className="event_place">
            <span>DATA</span>
            <span>MIEJSCE</span>
          </div>
          <p>
            Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Proin nec
            efficitur ante. Curabitur tincidunt
            eros a fringilla vulputate. Aenean
            mattis, ligula eu luctus egestas,
            augue neque aliquet magna, ullamcorper
            tincidunt neque sem ut erat. Donec
            egestas ante nec condimentum mollis.
            In et urna eu diam venenatis feugiat
            in at nunc. Suspendisse dictum dapibus
            mauris, a bibendum purus dignissim
            lobortis. Cras enim mauris, convallis
            eu tincidunt tempus, interdum ac enim.
            Aliquam at porta elit. Aenean mattis
            quis purus efficitur mattis. Maecenas
            ultrices massa vitae nibh iaculis, et
            luctus ipsum cursus. Mauris id velit
            id orci euismod accumsan at et erat.
            In dignissim condimentum imperdiet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Event;
