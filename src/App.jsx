// packages
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// components | pages
import HomePage from './components/Home.page';
import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import RQSuperHeroPage from './components/RQSuperHero.page';
import ParallelQueriesPage from './components/ParallelQueries.page';
import DynamicParallelPage from './components/DynamicParallel.page';
import DependentQueriesPage from './components/DependentQueries.page';
import PaginatedQueriesPage from './components/PaginatedQueries.page';
import InfiniteQueriesPage from './components/InfiniteQueries.page';
// css
import './App.css';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHeroPage />} />
            <Route path='/rq-parallel-queries' element={<ParallelQueriesPage />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[2, 3, 4]} />} />
            <Route path='/rq-dependent-queries' element={<DependentQueriesPage email='narendra@example.com' />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
    </QueryClientProvider>
  )
}

export default App;

export const Header = () => {
  return (
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/super-heroes'>Tranditional Super Heroes</Link></li>
        <li><Link to='/rq-super-heroes'>RQ Super Heroes</Link></li>
        <li><Link to='/rq-parallel-queries'>RQ Parallel</Link></li>
        <li><Link to='/rq-dynamic-parallel'>RQ Dynamic Parallel</Link></li>
        <li><Link to='/rq-dependent-queries'>RQ Dependent</Link></li>
        <li><Link to='/rq-paginated'>RQ Paginated</Link></li>
        <li><Link to='/rq-infinite'>RQ Infinite</Link></li>
      </ul>
    </nav>
  );
};
