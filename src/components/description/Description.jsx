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
              Według Davida Lowenthala Europa
              funkcjonuje przede wszystkim jako
              konstrukt mentalny, a nie jako
              jednolita całość geograficzna czy
              społeczna[1]. Mimo to, Europa często
              bywa utożsamiana z granicami Unii
              Europejskiej. Proces ten ujawnia się
              nie tylko w „eurointegracjach” tzw.
              państw trzecich z UE, ale także w
              podziale ludzi na politycznych
              obywateli* Unii Europejskiej i na
              osób z politycznym obywatelstwem
              tzw. krajów trzecich
            </p>
            <p className="bold">
              Projekt Eurowarsztat ma na celu
              przełamanie granic przynależności do
              „europejskości”, która często jest
              zawężona do granic UE. Razem z
              zaproszonymi do projektu migrantkami
              i migrantami z tzw. krajów trzecich
              zauważamy, że osoby migranckie są
              nieodłączną częścią współczesnego
              krajobrazu społecznego. Ich obecność
              – obok innych obywateli –
              współtworzy teraźniejszość i
              przyszłość Europy.
            </p>
            <p>
              Podjęte w ramach projektu działania
              opierają się na założeniu, że w
              kontekście globalnej migracji i
              związanych z nią zmian społecznych
              temat wspólnej, heterogenicznej
              przyszłości wciąż jest pomijany.
              Projekt koncentruje się na refleksji
              nad współczesnym systemem
              obywatelstwa politycznego**. W
              przypadku politycznych osób
              nieobywatelskich*** jego brak wiąże
              się z wykluczeniem z pełni praw
              politycznych, czyli ograniczeniem
              możliwości wpływania na sprawy
              publiczne oraz kształtowania
              przyszłości swoich wspólnot.
            </p>
            <p>
              W ramach Eurowarsztatu, razem z
              osobami uczestniczącymi w projekcie,
              wskazujemy dostrzegane przez nas
              problemy i proponujemy ich
              rozwiązania. Projekt stanowi próbę
              wyobrażenia przyszłości, w której
              głosy migrantów i migrantek będą
              miały prawo współkształtować tę
              przyszłość.
            </p>
            <p className="asterisk">
              * polityczny obywatel – osoba
              posiadająca prawny status
              obywatelski w miejscu swojego
              zamieszkania.
            </p>
            <p className="asterisk">
              ** obywatelstwo polityczne –
              formalny status przynależności do
              państwa, które gwarantuje swoim
              politycznym obywatelom pełnię praw,
              w tym prawa polityczne.
            </p>
            <p className="asterisk">
              *** polityczna osoba nieobywatelska
              – osoba nieposiadająca obywatelstwa
              politycznego w kraju swojego
              zamieszkania, w związku z czym jest
              wykluczona z części lub pełni praw
              politycznych. W zależności od kraju
              swojego pochodzenia, posiadanego
              obywatelstwa, jak i polityki kraju
              zamieszkania polityczni nieobywatele
              są zróżnicowaną grupą pod względem
              dostępu do praw politycznych.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
