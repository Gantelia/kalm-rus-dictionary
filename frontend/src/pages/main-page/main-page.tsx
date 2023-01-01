import { useState } from 'react';
import Recognition from '../../components/recognition/recognition';
import Synthesis from '../../components/synthesis/synthesis';
import TabLabel from '../../components/tab-label/tab-label';
import { Tabs } from '../../const';
import './main-page.scss';

function MainPage() {
  const [activeTab, setActiveTab] = useState(Tabs.Synthesis);

  const handleTabClick = (label: Tabs) => setActiveTab(label);
  return (
    <main className="main">
      <h1 className="visually-hidden">Синтез и распознавание калмыцкой речи</h1>
      <div className="main__container">
        <TabLabel active={activeTab} onClick={handleTabClick}>
          {Tabs.Synthesis}
        </TabLabel>
        <TabLabel active={activeTab} onClick={handleTabClick}>
          {Tabs.Recognition}
        </TabLabel>
        <section className="tab-content">
          <h2 className="visually-hidden">{activeTab}</h2>
          {activeTab === Tabs.Synthesis && <Synthesis />}
          {activeTab === Tabs.Recognition && <Recognition />}
        </section>
      </div>
    </main>
  );
}

export default MainPage;
