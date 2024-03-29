import { Alert, StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useEffect, useState } from 'react'

import Avatar from './Avatar'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../libs/supabase'

export default function Account({session} : { session: Session}) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState('')
    const [website, setWebsite] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        if(session) getProfile()
    },[session])

    async function getProfile() {
       try {
        setLoading(true)
        if(!session.user) throw new Error('No user on the session!')
        
        let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', session?.user.id)
            .single()
        if(error && status !== 406) {
            throw error
        }
        
        if(data) {
            setUsername(data.username)
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
        }
       } catch (error) {
        if(error instanceof Error) {
            Alert.alert(error.message)
        }
       } finally {
        setLoading(false)
       }
    }

    async function updateProfile({
        username, 
        website, 
        avatar_url
    } : {
        username: string,
        website: string,
        avatar_url: string
    }) {
        try {
            setLoading(true)
            if(!session.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date()
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) { throw error }
        } catch (error) {
            if(error instanceof Error) {
            Alert.alert(error.message)}
        } finally {
            setLoading(false)
        }
    }

    return(
        <View>
            <View style={[styles.mt40, styles.avatar]}>
                <Avatar
                    size={100}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url)
                        updateProfile({ username, website, avatar_url: url})
                    }}
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={session?.user?.email} />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Username" value={username || ''} onChangeText={(text) => setUsername(text)} />
            </View>
            <View style={styles.verticallySpaced}>
                <Input label="Website" value={website || ''} onChangeText={(text) => setWebsite(text)} />
            </View>
            
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Loading ...' : 'Update'}
                    onPress={() => updateProfile({username, website, avatar_url: avatarUrl})}
                    disabled={loading}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch'
    },
    mt20: {
        marginTop: 20
    },
    mt40: {
        marginTop: 60
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});


