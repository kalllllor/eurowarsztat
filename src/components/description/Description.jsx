import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Description = (props) => {
  const ref = useRef();

  return (
    <div
      className="desc__wrapper"
      ref={ref}
      {...props}
    >
      <div className="desc__container">
        <p>
          Eurowarsztat to otwarty projekt
          wynikający z refleksji na temat
          widzialności perspektyw osób
          migranckich. Według badań Komisji
          Europejskiej w 2023 roku około 6
          procent, czyli 27,3 miliona mieszkańców
          i mieszkanek krajów Unii Europejskiej
          stanowiły osoby nie posiadające
          obywatelstwa jednego z krajów
          członkowskich. Najpewniej w najbliższych
          latach te liczby będą systematycznie
          rosnąć.
        </p>
        <p>
          Ze względu na brak obywatelstwa państwa
          swojego zamieszkania, osoby migranckie
          na co dzień mierzą się z licznymi
          nierównościami. W szczególnie trudnej
          sytuacji znajdują się tzw. obywatele
          krajów trzecich (osoby pochodzące spoza
          UE), gdyż brak “unijnego” paszportu
          wiąże się dla nich ze znacznym
          ograniczeniem praw obywatelskich, jak i
          brakiem politycznej sprawczości. Mimo,
          iż własnymi rękami i intelektem
          współtworzą wspólnoty w miejscach
          swojego pobytu, najczęściej nie mogą
          uczestniczyć w pozwalających na
          współdecydowanie o wspólnej przyszłości
          procesach demokratycznych.
        </p>
        <p>
          Zainicjowany przez artystkę Martę
          Romankiv projekt “Eurowarsztat” jest
          zbudowany wokół pytania, jak uczynić
          głosy mniejszości - w tym osób
          mieszkających i pracujących na terenie
          Unii Europejskiej, ale nie posiadających
          europejskich paszportów - tak samo
          słyszalne, jak głosy polityków i
          polityczek. Na zarejestrowanych
          nagraniach uczestniczki i uczestnicy
          opowiadają o własnych wizjach
          przyszłości oraz proponują niezbędne
          według nich zmiany społeczne. Zdjęcia i
          nagrania realizowane są w konwencji
          glamour: profesjonalna wizażystka
          wykonuje bohaterom i bohaterkom
          delikatny makijaż, każda z osób ma
          gładkie, czarne ubranie i koronę ze
          złotych gwiazd. Estetyka fotografii i
          nagrań nawiązuje do sesji modowych z
          luksusowych magazynów. Zabiegi te są
          skierowane na symbolicznie zerwanie ze
          stereotypem migrantów i migrantek
          wyłącznie jako ofiar i przybliżenia
          perspektywy, w której jako polityczne
          osoby nieobywatelskie* przywracają sobie
          należne, równe miejsce w strukturze
          europejskiej wspólnoty.
        </p>
        <p>
          Osoby z doświadczeniem migracji mogą
          podzielić się swoimi przemyśleniami i
          opiniami na temat przyszłości wspólnoty
          europejskiej w formie tekstu, nagrania
          audio lub wideo przesyłając materiały na
          adres mailowy:
        </p>
        <p className="asterisk">
          *Polityczny nieobywatel – osoba
          nieposiadająca obywatelstwa kraju
          swojego zamieszkania, w związku czym
          jest wykluczona z części lub pełni praw
          politycznych. W zależności od kraju
          swojego pochodzenia, posiadanego
          obywatelstwa, jak i polityki kraju
          zamieszkania polityczni nieobywatele są
          zróżnicowaną grupą pod względem dostępu
          do politycznych praw. [termin
          zaproponowany w ramach pracy doktorskiej
          Marty Romankiv] Prezentowane nagrania są
          częścią badań doktorskich Marty
          Romankiv, realizowanych na Akademii
          Sztuk Pięknych w Gdańsku pod opieką
          prof. dr hab. Moniki Zawadzkiej.
        </p>
      </div>
    </div>
  );
};

export default Description;
