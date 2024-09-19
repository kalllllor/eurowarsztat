import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

const Description = (props) => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="desc__wrapper" {...props}>
          <div className="desc__container">
            <p>
              Zainicjowany przez artystkę Martę
              Romankiv projekt Eurowarsztat jest
              zbudowany wokół pytania, jak uczynić
              głosy mniejszości - w tym osób
              mieszkających i pracujących na
              terenie Unii Europejskiej, ale nie
              posiadających europejskich
              paszportów - tak samo słyszalne, jak
              głosy polityków i polityczek.
            </p>
            <p className="bold">
              Otwarty projekt wynika z refleksji
              na temat widzialności perspektyw
              osób migranckich. Według badań
              Komisji Europejskiej w 2023 roku
              około 6 procent, czyli 27,3 miliona
              mieszkańców i mieszkanek krajów Unii
              Europejskiej stanowiły osoby nie
              posiadające obywatelstwa jednego z
              krajów członkowskich. Najpewniej w
              najbliższych latach te liczby będą
              systematycznie rosnąć.
            </p>
            <p>
              Ze względu na brak politycznego
              obywatelstwa* państwa swojego
              zamieszkania, osoby migranckie na co
              dzień mierzą się z licznymi
              nierównościami. W szczególnie
              trudnej sytuacji znajdują się tzw.
              obywatele krajów trzecich (osoby
              pochodzące spoza UE), gdyż brak
              “unijnego” paszportu wiąże się dla
              nich ze znacznym ograniczeniem praw
              obywatelskich, jak i brakiem
              politycznej sprawczości. Mimo, iż
              własnymi rękami i intelektem
              współtworzą wspólnoty w miejscach
              swojego pobytu, najczęściej nie mogą
              uczestniczyć w pozwalających na
              współdecydowanie o wspólnej
              przyszłości procesach
              demokratycznych.
            </p>
            <p>
              Na zarejestrowanych nagraniach
              uczestniczki i uczestnicy opowiadają
              o własnych wizjach przyszłości oraz
              proponują niezbędne według nich
              zmiany społeczne. Zdjęcia i nagrania
              realizowane są w konwencji glamour:
              profesjonalna wizażystka wykonuje
              bohaterom i bohaterkom delikatny
              makijaż, każda z osób ma gładkie,
              czarne ubranie i koronę ze złotych
              gwiazd. Estetyka fotografii i nagrań
              nawiązuje do sesji modowych z
              luksusowych magazynów. Zabiegi te są
              skierowane na symbolicznie zerwanie
              ze stereotypem migrantów i migrantek
              wyłącznie jako ofiar i przybliżenia
              perspektywy, w której jako
              polityczne osoby nieobywatelskie**
              przywracają sobie należne, równe
              miejsce w strukturze europejskiej
              politycznej wspólnoty.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
