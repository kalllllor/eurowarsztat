import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Description = () => {
  const ref = useRef();

  return (
    <div className="desc__wrapper" ref={ref}>
      <div className="desc__container">
        <p>
          Eurowarsztat to otwarty projekt Marty
          Romankiv, w którym artystka, bazując na
          własnym doświadczeniu, rozmawia z
          migrantami i migrantkami o przyszłości
          Europy. Wspólnie zastanawiają się, jak
          uczynić głosy mniejszości - w tym osób
          mieszkających i pracujących na terenie
          Unii Europejskiej, ale nie posiadających
          europejskich paszportów - tak samo
          słyszalnymi jak głosy polityków i
          polityczek.
        </p>
        <p>
          Osoby migranckie na co dzień mierzą się
          z licznymi nierównościami i brakiem
          sprawczości politycznej. Działanie
          “Eurowarsztat” jest jednak skierowane na
          zerwanie ze stereotypem migrantów i
          migrantek jako osób cierpiących, w
          kryzysie, skupionych na przetrwaniu. Na
          zarejestrowanych nagraniach zaproszone
          uczestniczki i uczestnicy opowiadają o
          własnych wizjach przyszłości oraz
          proponują niezbędne według nich zmiany
          społeczne.
        </p>
        <p>
          Zdjęcia i nagrania realizowane są w
          konwencji glamour: profesjonalna
          wizażystka wykonuje bohaterom i
          bohaterkom delikatny makijaż, każda z
          osób ma gładkie, czarne ubranie i koronę
          ze złotych gwiazd. Estetyka fotografii i
          nagrań nawiązuje do sesji modowych z
          luksusowych magazynów. Migranci i
          migrantki w zdecydowanej większości
          wypowiadają się w swoich ojczystych
          językach. Dzięki tym zabiegom
          symbolicznie przywracają sobie należne,
          równe miejsce w strukturze europejskiej
          wspólnoty.
        </p>
        <p>
          Według badań Komisji Europejskiej w 2021
          roku 8,4 proc. mieszkańców i mieszkanek
          krajów unijnych stanowiły osoby urodzone
          poza jej granicami. To aż 37,5 miliona
          osób. W lipcu 2022 roku UNHCR podała, że
          od początku rosyjskiej napaści na
          Ukrainę do Unii przybyło kolejne 6
          milionów ludzi. Najpewniej w
          najbliższych latach te liczby będą
          systematycznie rosnąć.
        </p>
        <p>
          Powody migracji są bardzo różne:
          niezależnie od osobistych motywacji
          osoby opuszczające kraj urodzenia muszą
          mierzyć się ze znacznym ograniczeniem
          praw obywatelskich w nowym miejscu
          zamieszkania. Mimo że czynnie
          uczestniczą w życiu swoich nowych
          społeczności, pracują, płacą podatki czy
          wykonują nieodpłatną pracę na rzecz
          wspólnoty nie mogą podejmować decyzji
          politycznych. Koncepcja obywatelstwa,
          mająca swoje korzenie w XIX-wiecznych
          nacjonalizmach, niezmiennie
          przyporządkowuje ludzi do państw.
        </p>
        <p>
          W swoich działaniach Marta Romankiv pyta
          o zasadność stosowania dawnych formuł.
          Jak zmienić reguły, aby bardziej
          odpowiadały współczesnemu kształtowi
          świata? Czy możemy dostosować politykę
          państw do potrzeb osób w nich
          mieszkających? Co o tym myślą migranci i
          migrantki? “Eurowarsztat” daje szansę na
          wysłuchanie ich opinii.
        </p>
      </div>
    </div>
  );
};

export default Description;
