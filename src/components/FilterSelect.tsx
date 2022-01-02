import { Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Tag, tags } from 'types'

interface Props {
  selectedTags: Tag[]
  setTags: (t: any) => void
}

const FilterSelect: React.FunctionComponent<Props> = ({
  selectedTags,
  setTags,
}: Props) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const detectClick = (e) => {
      if (!open) {
        return
      }

      if (!containerRef || containerRef.current === null) {
        return
      }

      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', detectClick)
    return () => document.removeEventListener('click', detectClick)
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) {
        return
      }

      // Esc key
      if (e.keyCode === 27) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const toggleFilter = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      const clone = [...selectedTags]
      const index = clone.indexOf(tag)
      if (index !== -1) {
        clone.splice(index, 1)
        setTags(clone)
      }
    } else {
      if (selectedTags.length === 10) {
        return
      }
      setTags([...selectedTags, tag])
    }

    setOpen(false)
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-between w-full p-4 font-semibold border border-gray-200 rounded-lg btn-hover-shadow"
      >
        <div>
          {selectedTags.length === 0
            ? 'Select filters'
            : `${selectedTags.length} filters`}
        </div>
        <div>
          <ChevronDownIcon className="w-6 h-6 text-gray-500" />
        </div>
      </button>

      <Transition
        show={open}
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        enter="transition ease-in duration-100"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <div className="absolute z-20 w-full overflow-auto bg-white rounded-lg shadow-2xl max-h-80">
          <ul>
            {tags.map((tag) => (
              <li
                key={tag}
                className="border-b border-gray-200 cursor-pointer hover:bg-slate-100"
                onClick={() => toggleFilter(tag)}
              >
                <div className="flex items-center p-4">
                  <div className="flex items-center justify-center w-5 h-5 mr-3 border border-gray-200 rounded-full">
                    {selectedTags.includes(tag) && (
                      <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <div className="font-semibold">{tag}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default FilterSelect
