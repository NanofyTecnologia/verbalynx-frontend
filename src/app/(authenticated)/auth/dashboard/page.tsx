import { Fragment } from 'react'

export default function Page() {
  return (
    <>
      <main className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Fragment key={index}>
            <div className="space-y-4 rounded-md bg-white p-2.5 py-4">
              <h2 className="font-semibold">Lorem Ipsum</h2>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <p className="text-xs">Lorem Ipsum</p>

                  <div className="w-3/4 rounded-md bg-red-300 p-4"></div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-xs">Lorem Ipsum</p>

                  <div className="w-4/6 rounded-md bg-green-300 p-4"></div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-xs">Lorem Ipsum</p>

                  <div className="w-2/4 rounded-md bg-orange-300 p-4"></div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-xs">Lorem Ipsum</p>

                  <div className="w-2/6 rounded-md bg-yellow-300 p-4"></div>
                </div>

                <div className="flex items-center gap-1">
                  <p className="text-xs">Lorem Ipsum</p>

                  <div className="w-1/6 rounded-md bg-lime-300 p-4"></div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </main>
    </>
  )
}
