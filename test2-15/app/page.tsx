import ClimbList from "@/components/climb-list"
import ClimbForm from "@/components/climb-form"

export default function Home() {
  return (
    <div className="flex h-full">
      <div className="flex-1 overflow-y-auto pr-6">
        <ClimbList />
      </div>
      <div className="w-1/3 min-w-[300px]">
        <ClimbForm />
      </div>
    </div>
  )
}

