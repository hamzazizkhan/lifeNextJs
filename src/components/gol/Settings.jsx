import Card from '@/components/ui/Card'

export default function Settings({buttons}){

    return(
       <Card title={'settings'} paragraph={'this is where you can change the speed, size and number of iterations of the animation'}
       buttons={buttons}/> 
    )
}