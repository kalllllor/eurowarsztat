import React from "react";
import {
  Canvas,
  useThree,
} from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Credits = () => {
  const { height } = useThree(
    (state) => state.viewport
  );
  const creditLines = [
    "Teodor Ajder",
    "Khedi Alieva",
    "Jan Bačynsjkyi",
    "Walid Boussad",
    "Natalia Chyntalian/Natali Che",
    "Claudia Ciubanu",
    "Taras Gembik",
    "Natalia Gladysh",
    "Iryna",
    "Liudmyla Kabanina",
    "Oksana Kolisnyk",
    "Nadia Kondrach",
    "Liza Konovalova",
    "Alexey Lunev",
    "Olga Maistrenko",
    "Maro",
    "Olesia Melichova",
    "Abdallah Razik Omar",
    "Marianna Romashevska",
    "Taso Pataridze",
    "Ruslana Poberezhnyk",
    "Juan Martín Sánchez",
    "Liubov Savycka",
    "Lesia Shykiriava",
    "Tatiana Sulaieva",
    "Anna Shchepet",
    "Tomila",
    "Veronika Ismailova",

    "Fotografię: Mateusz Lipiński",
    "Zdjęcia wideo: Marta Romankiv",
    "Nagrania dźwięku: Tomasz Koszewnik, Marta Romankiv",
    "Światło: Mateusz Lipiński",

    "Osoby kuratorskie: Andrzej Pakuła, Aleksandra Skowrońska (Pawilon w Poznaniu), Zofia Rojek (Muzeum Warszawy)",

    "Produkcja nagrań: Monika Petryczko (PAWILON w Poznaniu); Zofia Rojek (Muzeum Warszawy); Marta Galewska (Muzeum Warszawy)",

    "Napisy: Dorota Migas-Mazur, Marta Romankiv, Michał Tomaszewski",
    "Tłumaczenie tekstów wideo: Marta Romankiv, Karol Waniek, Natalia Jakimowicz",
  ];

  return (
    <group position={[0, height * -4, 0]}>
      <Text
        color="white"
        fontSize={0.1}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
        maxWidth={100}
      >
        Teodor Ajder Khedi Alieva Jan Bačynsjkyi
        Walid Boussad Natalia Chyntalian/ Natali
        Che Claudia Ciubanu Taras Gembik Natalia
        Gladysh Iryna Liudmyla Kabanina Oksana
        Kolisnyk Nadia Kondrach Liza Konovalova
        Alexey Lunev Olga Maistrenko Maro Olesia
        Melichova Abdallah Razik Omar Marianna
        Romashevska Taso Pataridze Ruslana
        Poberezhnyk Juan Martín Sánchez Liubov
        Savycka Lesia Shykiriava Tatiana Sulaieva
        Anna Shchepet Tomila Veronika Ismailova
        Fotografię: Mateusz Lipiński Zdjęcia
        wideo: Marta Romankiv Nagrania dźwięku:
        Tomasz Koszewnik, Marta Romankiv Światło:
        Mateusz Lipiński Osoby kuratorskie:
        Andrzej Pakuła, Aleksandra Skowrońska
        (Pawilon w Poznaniu), Zofia Rojek (Muzeum
        Warszawy) Produkcja nagrań: Monika
        Petryczko (PAWILON w Poznaniu); Zofia
        Rojek (Muzeum Warszawy); Marta Galewska
        (Muzeum Warszawy) Napisy: Dorota
        Migas-Mazur, Marta Romankiv, Michał
        Tomaszewski Tłumaczenie tekstów wideo:
        Marta Romankiv, Karol Waniek, Natalia
        Jakimowicz
      </Text>
    </group>
  );
};

export default Credits;
