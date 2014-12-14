// formatting messages into a packet for sending:
    UdpTransmitSocket transmitSocket( IpEndpointName( "http:127.0.0.1", 5000));

    char buffer[OUTPUT_BUFFER_SIZE];
    osc::OutboundPacketStream p( buffer, 8);

    p << osc::BeginBundleImmediate
        << osc::BeginMessage( "/test1" )
            << true << 23 << (float)3.1415 << "hello" << osc::EndMessage
        << osc::BeginMessage( "/test2" )
            << true << 24 << (float)10.8 << "world" << osc::EndMessage
        << osc::EndBundle;
	transmitSocket.Send( p.Data(), p.Size() );
// processing incoming messages
class ExamplePacketListener : public osc::OscPacketListener {
protected:
	virtual void ProcessMessage( const osc::ReceivedMessage& m,
		const IpEndpointName& remoteEndpoint )
	{
		try{
			// example of parsing single messages. osc::OscPacketListener
			// handles the bundle traversal.
			if( strcmp( m.AddressPattern(), "/test1" ) == 0 ){
				// example #1 -- argument stream interface
				osc::ReceivedMessageArgumentStream args = m.ArgumentStream();
				bool a1;
				osc::int32 a2;
				float a3;
				const char *a4;
				args >> a1 >> a2 >> a3 >> a4 >> osc::EndMessage;

                std::cout << "received '/test1' message with arguments: "
                    << a1 << " " << a2 << " " << a3 << " " << a4 << "\n";                              

			}else if( strcmp( m.AddressPattern(), "/test2" ) == 0 ){
				// example #2 -- argument iterator interface, supports
				// reflection for overloaded messages (eg you can call
				// (*arg)->IsBool() to check if a bool was passed etc).

                osc::ReceivedMessage::const_iterator arg = m.ArgumentsBegin();
                bool a1 = (arg++)->AsBool();
                int a2 = (arg++)->AsInt32();
                float a3 = (arg++)->AsFloat();
                const char *a4 = (arg++)->AsString();
                if( arg != m.ArgumentsEnd() )
                    throw osc::ExcessArgumentException();

                std::cout << "received '/test2' message with arguments: "
                    << a1 << " " << a2 << " " << a3 << " " << a4 << "\n";
            }
        }catch( osc::Exception& e ){
            // any parsing errors such as unexpected argument types, or
            // missing arguments get thrown as exceptions.
            std::cout << "error while parsing message: "
                << m.AddressPattern() << ": " << e.what() << "\n";
        }
    }
};