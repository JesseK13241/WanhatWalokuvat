import GameCard from "@/components/GameCard"
import peli1 from "@/public/images/peli1.jpg"
import peli2 from "@/public/images/peli2.jpg"

export default function Pelit() {
  return (
    <div className="m-4 flex flex-wrap justify-center gap-4 sm:flex-row">
      <GameCard
        title="Veikkaa vuosikymmen"
        imageSrc={peli1}
        description="Veikkaa millä vuosikymmenellä annettu kuva on otettu."
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
