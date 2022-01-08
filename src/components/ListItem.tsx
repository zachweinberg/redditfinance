import { Subreddit } from 'types'
import { approxNumber } from '~/utils'

interface Props {
  subreddit: Subreddit
}

const ListItem: React.FunctionComponent<Props> = ({ subreddit }: Props) => {
  return (
    <li className="transition-colors duration-150 border-b border-gray-200 cursor-pointer hover:shadow-sm listitem hover:bg-slate-100">
      <a href={`https://reddit.com${subreddit.url}`} target="__blank">
        <div className="flex p-6">
          <div className="mr-3">
            {subreddit.logo ? (
              <img
                src={subreddit.logo}
                width={50}
                className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={subreddit.name.length > 12 ? '#163c19' : '#000c38'}
                className="flex-shrink-0 w-12 h-12 bg-white border border-gray-200 rounded-full"
              >
                <path d="M16.5,2.924,11.264,15.551H9.91L15.461,2.139h.074a9.721,9.721,0,1,0,.967.785ZM8.475,8.435a1.635,1.635,0,0,0-.233.868v4.2H6.629V6.2H8.174v.93h.041a2.927,2.927,0,0,1,1.008-.745,3.384,3.384,0,0,1,1.453-.294,3.244,3.244,0,0,1,.7.068,1.931,1.931,0,0,1,.458.151l-.656,1.558a2.174,2.174,0,0,0-1.067-.246,2.159,2.159,0,0,0-.981.215A1.59,1.59,0,0,0,8.475,8.435Z"></path>
              </svg>
            )}
          </div>

          <div className="grid flex-1 grid-cols-1 gap-2 md:flex">
            <p className="flex items-center text-sm font-semibold md:text-base text-dark md:w-1/3">
              {subreddit.name}
            </p>

            <div className="flex flex-wrap items-center flex-1 gap-2">
              {subreddit.tags.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-gray-700 bg-gray-200 rounded-md"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="ml-5 text-right">
            <p className="text-sm font-semibold text-dark">
              {approxNumber(subreddit.subscribers)}
            </p>
            <p className="text-xs font-medium text-gray-600">subscribers</p>
          </div>
        </div>

        {subreddit.redditDescription && (
          <div className="px-6 mb-6 overflow-hidden leading-6 text-gray-500 max-h-28">
            {subreddit.redditDescription.slice(0, 280) + '...'}
          </div>
        )}
      </a>
    </li>
  )
}

export default ListItem
