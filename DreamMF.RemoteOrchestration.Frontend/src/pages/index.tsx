import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { useHosts } from '@/hooks/useHosts';
import { useTags } from '@/hooks/useTags';
import { useRemotes } from '@/hooks/useRemotes';
import { ServerIcon, TagIcon, DatabaseIcon } from 'lucide-react';

const DashboardPage: React.FC = () => {
    const { data: hosts } = useHosts();
    const { data: tags } = useTags();
    const { data: remotes } = useRemotes();

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Total Hosts"
                            value={hosts?.length || 0}
                            prefix={<ServerIcon className="h-5 w-5" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Total Tags"
                            value={tags?.length || 0}
                            prefix={<TagIcon className="h-5 w-5" />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Total Remotes"
                            value={remotes?.length || 0}
                            prefix={<DatabaseIcon className="h-5 w-5" />}
                        />
                    </Card>
                </Col>
            </Row>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                        <Card
                            title="Recent Hosts"
                            extra={<a href="/hosts">View All</a>}
                        >
                            <div className="space-y-2">
                                {hosts?.slice(0, 3).map((host) => (
                                    <div key={host.host_ID} className="flex items-center gap-2">
                                        <ServerIcon className="h-4 w-4" />
                                        <span>{host.name}</span>
                                    </div>
                                ))}
                                {!hosts?.length && <p className="text-gray-500">No hosts found</p>}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card
                            title="Recent Tags"
                            extra={<a href="/tags">View All</a>}
                        >
                            <div className="space-y-2">
                                {tags?.slice(0, 3).map((tag) => (
                                    <div key={tag.tag_ID} className="flex items-center gap-2">
                                        <TagIcon className="h-4 w-4" />
                                        <span>{tag.text}</span>
                                    </div>
                                ))}
                                {!tags?.length && <p className="text-gray-500">No tags found</p>}
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Card
                            title="Recent Remotes"
                            extra={<a href="/remotes">View All</a>}
                        >
                            <div className="space-y-2">
                                {remotes?.slice(0, 3).map((remote) => (
                                    <div key={remote.remote_ID} className="flex items-center gap-2">
                                        <DatabaseIcon className="h-4 w-4" />
                                        <span>{remote.name}</span>
                                    </div>
                                ))}
                                {!remotes?.length && <p className="text-gray-500">No remotes found</p>}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DashboardPage;