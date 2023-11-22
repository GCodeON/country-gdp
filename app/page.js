import CountrySelect from './components/countries';

async function getData() {
  const baseURL = 'https://restcountries.com/v3.1';
  const res = await fetch(`${baseURL}/all`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();
  const countryList = data.sort((a,b) => (a.name.common > b.name.common) ? 1 : ((b.name.common > a.name.common) ? -1 : 0))

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className='country-list'>
        <CountrySelect data={countryList}></CountrySelect>
      </div>
    </main>
  )
}