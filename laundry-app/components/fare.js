export default fareComponent = (baseFare, timeRate, time, distanceRate, distance, surge) =>{
    const distanceKm = distance * 0.001
    const timeMin = time * 0.01666667
    const pricePerKm = distanceKm * distanceRate
    const pricePerMin = timeMin * timeRate
    const totalFare = (baseFare+pricePerKm+pricePerMin)*surge
    return Math.round(totalFare)  
}