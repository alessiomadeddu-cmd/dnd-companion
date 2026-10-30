import { useParams, useNavigate } from 'react-router-dom';
import HeaderSection from '../components/sheet/HeaderSection';
import VitalStatsSection from '../components/sheet/VitalStatsSection';
import ResourcesSection from '../components/sheet/ResourcesSection';
import AbilitiesSection from '../components/sheet/AbilitiesSection';
import SkillsSection from '../components/sheet/SkillsSection';
import ConditionsSection from '../components/sheet/ConditionsSection';
import ActionsSection from '../components/sheet/ActionsSection';

export default function CharacterSheet() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 max-w-2xl pb-20">
      <button 
        onClick={() => navigate('/')} 
        className="text-fantasy-gold hover:text-white mb-4 flex items-center text-sm"
      >
        ← Torna alla Home
      </button>

      <HeaderSection personaggioId={id} />
      <VitalStatsSection personaggioId={id} />
      <ResourcesSection personaggioId={id} />
      <AbilitiesSection personaggioId={id} />
      <SkillsSection personaggioId={id} />
      <ConditionsSection personaggioId={id} />
      <ActionsSection personaggioId={id} />
    </div>
  );
}