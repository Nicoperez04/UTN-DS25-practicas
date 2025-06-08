import React from 'react';
import SectionFiccion from './SecFiccion';
import SectionDeporte from './SecDeporte';
import SectionInfantil from './SecInfantil';
import SectionHistoria from './SecHistoria';

export default function Home() {
  return (
    <div>
      <SectionFiccion />
      <SectionDeporte />
      <SectionInfantil />
      <SectionHistoria />
    </div>
  );
}
