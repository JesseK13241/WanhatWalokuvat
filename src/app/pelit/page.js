import GameCard from "@/components/GameCard"
import arvaa from "../../public/images/arvaa.jpg"
import peli2Placeholder from "../../public/images/peli2_placeholder.jpg"

export default function Pelit() {
  return (
    <div className="flex flex-wrap gap-4">
      <GameCard
        title="Arvaa vuosikymmen"
        imageSrc={arvaa}
        description="Arvaa neljästä vaihtoehdosta, miltä vuosikymmeneltä kuva on"
        path="/pelit/peli1"
      />
      <GameCard
        title="Arvaa vanhempi"
        imageSrc={peli2Placeholder}
        description="Arvaa kumpi kuvista on vanhempi"
        path="/pelit/peli2"
      />
    </div>
  )
}
