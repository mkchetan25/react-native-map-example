declare module '@react-native-maps/polyline-direction' {
    import { Polyline } from 'react-native-maps';

    export default class PolylineDirection extends React.PureComponent<{
        origin: any;
        destination: any;
        apiKey: string;
        strokeWidth: number;
        strokeColor: string;
    }> {}
}