import Image from 'next/image'
import { Character } from '@/types'

interface CharacterCardProps {
  character: Character
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className='bg-[#1a1b26] rounded-lg overflow-hidden hover:bg-[#232534] transition-colors'>
      <div className='lg:hidden'>
        <div className='relative w-full h-48'>
          <Image src={character.image} alt={character.name} fill className='object-cover' />
        </div>
        <div className='p-4 space-y-3'>
          <h2 className='text-lg font-semibold text-white'>{character.name}</h2>

          <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm'>
            <div className='flex items-center gap-1'>
              <span
                className={`w-2 h-2 rounded-full ${
                  character.status.toLowerCase() === 'alive'
                    ? 'bg-green-500'
                    : character.status.toLowerCase() === 'dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                }`}
              />
              <span className='text-[#63a8f3]'>{character.status}</span>
            </div>
            {character.type && (
              <>
                <span className='text-gray-500'>•</span>
                <span className='text-[#63a8f3]'>{character.type}</span>
              </>
            )}
            <span className='text-gray-500'>•</span>
            <span className='text-[#63a8f3]'>{character.gender}</span>
          </div>

          <div className='space-y-2'>
            <div>
              <span className='text-gray-400'>Last known location:</span>
              <p className='text-[#63a8f3] truncate'>{character.location.name}</p>
            </div>
            <div>
              <span className='text-gray-400'>Origin:</span>
              <p className='text-[#63a8f3] truncate'>{character.origin.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden lg:flex p-4 gap-4'>
        <div className='flex-shrink-0'>
          <div className='relative w-24 h-24'>
            <Image src={character.image} alt={character.name} fill className='object-cover rounded-lg' />
          </div>
        </div>

        <div className='flex-grow min-w-0'>
          <h2 className='text-lg font-semibold text-white mb-2'>{character.name}</h2>

          <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm mb-2'>
            <div className='flex items-center gap-1'>
              <span
                className={`w-2 h-2 rounded-full ${
                  character.status.toLowerCase() === 'alive'
                    ? 'bg-green-500'
                    : character.status.toLowerCase() === 'dead'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
                }`}
              />
              <span className='text-[#63a8f3]'>{character.status}</span>
            </div>
            {character.type && (
              <>
                <span className='text-gray-500'>•</span>
                <span className='text-[#63a8f3]'>{character.type}</span>
              </>
            )}
            <span className='text-gray-500'>•</span>
            <span className='text-[#63a8f3]'>{character.gender}</span>
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div>
              <span className='text-gray-400 text-sm'>Last known location:</span>
              <p className='text-[#63a8f3] truncate'>{character.location.name}</p>
            </div>
            <div>
              <span className='text-gray-400 text-sm'>Origin:</span>
              <p className='text-[#63a8f3] truncate'>{character.origin.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
