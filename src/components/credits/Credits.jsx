import React from "react";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import { Text, Scroll } from "@react-three/drei";

const Credits = (props) => {
  const { height } = useThree(
    (state) => state.viewport
  );

  return (
    <div
      className="wrapper credits__wrapper"
      {...props}
    >
      <div className="container">
        <div className="desc__wrapper">
          <div className="desc__container">
            <p className="credits__bold">
              Inicjatorka projektu
            </p>
            <p className="credits">
              Marta Romankiv
            </p>
            <p className="credits__bold">
              Osoby współtworzące
            </p>
            <p className="credits">
              Teodor Ajder, Khedi Alieva, Jan
              Bačynsjkyi, Walid Boussad, Natalia
              Chyntalian/ Natali Che, Claudia
              Ciubanu, Taras Gembik, Natalia
              Gladysh, Iryna, Liudmyla Kabanina,
              Oksana Kolisnyk, Nadia Kondrach,
              Liza Konovalova, Alexey Lunev, Olga
              Maistrenko, Maro, Olesia Melichova,
              Abdallah Razik Omar, Marianna
              Romashevska, Taso Pataridze, Ruslana
              Poberezhnyk, Juan Martín Sánchez,
              Liubov Savycka, Lesia Shykiriava,
              Tatiana Sulaieva, Anna Shchepet,
              Tomila, Veronika Ismailova
            </p>
            <p className="credits__bold">
              Fotografię
            </p>
            <p className="credits">
              Mateusz Lipiński
            </p>
            <p className="credits__bold">
              Zdjęcia wideo
            </p>
            <p className="credits">
              Marta Romankiv
            </p>
            <p className="credits__bold">
              Nagrania dźwięku
            </p>
            <p className="credits">
              Tomasz Koszewnik, Marta Romankiv
            </p>
            <p className="credits__bold">
              Światło
            </p>
            <p className="credits">
              Mateusz Lipiński
            </p>
            <p className="credits__bold">
              Osoby kuratorskie
            </p>
            <p className="credits">
              Andrzej Pakuła, Aleksandra
              Skowrońska (Pawilon w Poznaniu),
              Zofia Rojek (Muzeum Warszawy)
            </p>
            <p className="credits__bold">
              Produkcja nagrań
            </p>
            <p className="credits">
              Monika Petryczko (PAWILON w
              Poznaniu), Zofia Rojek (Muzeum
              Warszawy), Marta Galewska (Muzeum
              Warszawy)
            </p>
            <p className="credits__bold">
              Napisy
            </p>
            <p className="credits">
              Dorota Migas-Mazur, Marta Romankiv,
              Michał Tomaszewski
            </p>
            <p className="credits__bold">
              Tłumaczenie tekstów wideo
            </p>
            <p className="credits">
              Marta Romankiv, Karol Waniek,
              Natalia Jakimowicz
            </p>
            <p className="credits__bold">
              Strona internetowa
            </p>
            <p className="credits">Karol Greń</p>
            <p>
              Projekt jest częścią badań
              doktorskich Marty Romankiv,
              realizowanych na Akademii Sztuk
              Pięknych w Gdańsku pod opieką profy.
              ASP, dry hab. Moniki Zawadzkiej oraz
              dry Honoraty Martin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
