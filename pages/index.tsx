import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { TestLink } from '../components/TestLink';

// const AllLinksQuery = gql`
//   query allLinksQuery($first: Int, $after: String) {
//     links(first: $first, after: $after) {
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//       edges {
//         cursor
//         node {
//           imageUrl
//           url
//           title
//           category
//           description
//           id
//         }
//       }
//     }
//   }
// `;

const TestQuranQuery = gql`
  query testQuranQuery($start: String, $end: String, $ids: Int) {
    verses(start: $start, end: $end) {
      id
      chapterId
      verseNumber
      textUthmani
      translation(ids: $ids) {
        id
        duration
        verseId
        recitationId
        url
      }
      reciter {
        reciterId
        english
        arabic
      }
    }
  }
`;
// const TestQuranQuery = gql`
//   query testQuranQuery($start: String, $end: String) {
//     verses(start: $start, end: $end) {
//       id
//       chapterId
//       verseNumber
//       textUthmani
//       translation {
//         id
//         duration
//         verseId
//         recitationId
//         url
//       }
//       reciter {
//         reciterId
//         english
//         arabic
//       }
//     }
//   }
// `;

function Home() {
  // const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
  //   variables: { first: 3 },
  // });

  const {
    data: data1,
    loading,
    error,
  } = useQuery(TestQuranQuery, {
    variables: { start: 'number1', end: 'number2', ids: 2000 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  console.log('data1', data1);

  // const { endCursor, hasNextPage } = data?.links.pageInfo;

  return data1.verses.textUthmani;

  // return (
  //   <div>
  //     <Head>
  //       <title>Test Links</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <div className="container mx-auto max-w-5xl my-20 px-5">
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  //         {data?.links.edges.map(({ node }, i) => (
  //           <Link href={`/link/${node.id}`} key={i}>
  //             <a>
  //               <TestLink
  //                 title={node.title}
  //                 category={node.category}
  //                 url={node.url}
  //                 id={node.id}
  //                 description={node.description}
  //                 imageUrl={node.imageUrl}
  //               />
  //             </a>
  //           </Link>
  //         ))}
  //       </div>
  //       <h1>{data1.quran.aya}</h1>
  //       {hasNextPage ? (
  //         <button
  //           className="px-4 py-2 bg-blue-500 text-white rounded my-10"
  //           onClick={() => {
  //             fetchMore({
  //               variables: { after: endCursor },
  //             });
  //           }}
  //         >
  //           more
  //         </button>
  //       ) : (
  //         <p className="my-10 text-center font-medium">You've reached the end!</p>
  //       )}
  //     </div>
  //   </div>
  // );
}

export default Home;
