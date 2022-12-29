import { Tabs } from '../../const';
import './tab-label.scss';

type TabLabelProps = {
  active: Tabs;
  children: Tabs;
  onClick: (label: Tabs) => void;
};

function TabLabel({ active, children, onClick }: TabLabelProps) {
  return (
    <button
      className={`tab-button ${
        active === children ? 'tab-button--active' : ''
      }`}
      type="button"
      onClick={() => onClick(children)}
    >
      {children}
    </button>
  );
}

export default TabLabel;
