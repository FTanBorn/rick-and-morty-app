import { getCharacters } from '@/lib/api'
import CharacterCard from '@/components/characters/CharacterCard'
import CharacterFilter from '@/components/characters/CharacterFilter'
import Pagination from '@/components/ui/Pagination'
import MobileOptimizedLayout from '@/components/layout/MobileOptimizedLayout'

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const currentPage = Number(searchParams.page) || 1
  const data = await getCharacters({
    status: searchParams.status,
    gender: searchParams.gender,
    page: currentPage
  })

  const content = (
    <>
      <div className='space-y-4'>
        {data.results.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={data.info.pages}
        hasNextPage={!!data.info.next}
        hasPrevPage={!!data.info.prev}
      />
    </>
  )

  const filter = <CharacterFilter initialStatus={searchParams.status} initialGender={searchParams.gender} />

  return <MobileOptimizedLayout filter={filter} content={content} totalResults={data.info.count} />
}
