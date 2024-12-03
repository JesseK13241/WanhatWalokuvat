import GameCard from "@/components/GameCard"
import peli1 from "@/public/images/peli1.jpg"
import peli2 from "@/public/images/peli2.jpg"

export default function Pelit() {
  return (
    <div className="flex flex-wrap gap-4">
      <GameCard
        title="Arvaa vuosikymmen"
        imageSrc={peli1}
        description="Arvaa neljästä vaihtoehdosta, miltä vuosikymmeneltä kuva on"
        path="/pelit/peli1"
      />
      <GameCard
        title="Arvaa vanhempi"
        imageSrc={peli2}
        description="Arvaa kumpi kuvista on vanhempi"
        path="/pelit/peli2"
      />
    </div>
  )
}
