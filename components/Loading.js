import ContentLoader from 'react-content-loader'

const Loading = (props) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    backgroundColor="#4f46e5"
    uniqueKey='loading-aria'
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
)

export default Loading