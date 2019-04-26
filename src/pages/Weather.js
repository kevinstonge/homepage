import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
      <div>
        <article>
          <ul>
            <li><a href="predominant.htm">Predominant weather forecast maps</a></li>
            <li><a href="https://weather.us/weather/5284283-colchester-ct">weather.us: Colchester</a></li>
            <li><a href="https://www.weather.gov/okx//winter">weather.gov: snow amount potential, long range forecasts!</a></li>
            <li><a href="https://forecast.weather.gov/gridpoint.php?site=okx&TypeDefault=graphical">weather.gov: generate hourly graphs</a></li>
            <li><a href="https://www.nhc.noaa.gov/satellite.php">weather.gov: satellite imagery</a>
            <ul>
              <li><a href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/1250x750.jpg">GEOS color</a></li>
              <li><a href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/02/1250x750.jpg">GEOS Visible</a></li>
              <li><a href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/07/1250x750.jpg">Shortwave IR</a></li>
              <li><a href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/13/1250x750.jpg">IR</a></li>
              <li><a href="https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/08/1250x750.jpg">Water vapor</a></li>
            </ul></li>
            <li><a href="http://mag.ncep.noaa.gov/model-guidance-model-area.php">noaa.gov: lots of forecast models</a></li>
            <li><a href="https://www.weather.gov/forecastmaps">weather.gov: national forecast maps</a></li>
            <li><a href="https://graphical.weather.gov/sectors/nemetro.php#tabs">weather.gov: graphical forecasts</a></li>
            <li><a href="https://weather.cod.edu/analysis/">weather.cod.edu: lots of interesting maps to analyze</a></li>
            <li><a href="https://www.nbcconnecticut.com/weather/school-closings/">nbcconnecticut: school closings</a></li>
            <li><a href="https://www.nbcconnecticut.com/weather/?zipCode=06415">nbcconnecticut: forecast</a></li>
            <li><a href="https://twitter.com/NOAASatellites">@NOAASatellites</a></li>
            <li><a href="https://twitter.com/Connecticut_WX">@Connecticut_WX</a></li>
            <li><a href="https://weather.com/weather/hourbyhour/l/06415">twc: hourly</a></li>
            <li><a href="https://weather.com/weather/tenday/l/06415">twc: 10 day</a></li>
            <li><a href="https://www.nhc.noaa.gov/">National Hurricane Center</a></li>
            <li><a href="http://www.cpc.ncep.noaa.gov/">Climate prediction</a></li>
          </ul>
        </article>
      </div>
    )
  }
}
